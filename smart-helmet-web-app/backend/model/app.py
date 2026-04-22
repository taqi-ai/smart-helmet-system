import cv2
from ultralytics import YOLO
import os
import time
import threading
import queue
import pyttsx3
from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "best.pt")

try:
    model = YOLO(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

cap = cv2.VideoCapture(0)

# Global stats
stats = {
    "total_detected": 0,
    "helmets": 0,
    "no_helmets": 0,
    "status": "Running",
    "last_alert": 0,
    "alert_active": False
}

speech_queue = queue.Queue()

def tts_worker():
    try:
        engine = pyttsx3.init()
        while True:
            text = speech_queue.get()
            if text is None:
                break
            engine.say(text)
            engine.runAndWait()
            speech_queue.task_done()
    except Exception as e:
        print(f"TTS Error: {e}")

threading.Thread(target=tts_worker, daemon=True).start()

def generate_frames():
    global stats
    while True:
        success, frame = cap.read()
        if not success:
            break
        
        if model:
            results = model(frame, verbose=False)[0]
            no_helmet_detected = False
            
            helmets_in_frame = 0
            no_helmets_in_frame = 0
            
            for box in results.boxes:
                cls = int(box.cls[0])
                conf = float(box.conf[0])
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                
                if cls == 0:
                    label = "Helmet"
                    color = (0, 255, 0)
                    helmets_in_frame += 1
                else:
                    label = "NO HELMET"
                    color = (0, 0, 255)
                    no_helmet_detected = True
                    no_helmets_in_frame += 1
                    
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
                            
            stats["helmets"] = helmets_in_frame
            stats["no_helmets"] = no_helmets_in_frame
            stats["total_detected"] = helmets_in_frame + no_helmets_in_frame
            stats["alert_active"] = no_helmet_detected
            
            if no_helmet_detected and time.time() - stats["last_alert"] > 3:
                speech_queue.put("Please wear helmet")
                stats["last_alert"] = time.time()
                
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/stats')
def get_stats():
    return jsonify({
        "total_detected": stats["total_detected"],
        "helmets": stats["helmets"],
        "no_helmets": stats["no_helmets"],
        "status": stats["status"],
        "alert_active": stats["alert_active"]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=True)
