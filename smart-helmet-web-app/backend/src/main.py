import cv2
from ultralytics import YOLO
import pyttsx3
import time
import os

# ✅ FIXED PATH (works everywhere)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "best.pt")

model = YOLO(MODEL_PATH)

# 🔊 Voice engine
engine = pyttsx3.init()
last_alert_time = 0

# 📷 Webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Camera not working")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)[0]
    no_helmet_detected = False

    for box in results.boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        if cls == 0:
            label = "Helmet"
            color = (0, 255, 0)
        else:
            label = "NO HELMET"
            color = (0, 0, 255)
            no_helmet_detected = True

        # Draw bounding box
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

    # 🔊 Alert every 3 sec if no helmet
    if no_helmet_detected and time.time() - last_alert_time > 3:
        engine.say("Please wear helmet")
        engine.runAndWait()
        last_alert_time = time.time()

    cv2.imshow("Smart Helmet System", frame)

    # ESC to exit
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()