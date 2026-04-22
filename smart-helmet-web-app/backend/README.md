# 🪖 Smart Helmet Detection System

Real-time helmet / no-helmet detection using **YOLOv8 + OpenCV**.
Built for safety systems, automation, and AI-based monitoring.

---

## 🚀 Features

* 🎥 Real-time webcam detection
* 🧠 YOLOv8 custom-trained model
* ⚡ GPU acceleration (RTX supported)
* 📦 Lightweight & fast inference
* 🔴 Highlights **NO HELMET** with bounding box

---

## 🧠 Model Details

* Trained on **470+ custom images**
* Classes:

  * `Helmet`
  * `No Helmet`
* Accuracy:

  * **mAP ≈ 0.99**
* Framework: Ultralytics YOLOv8

---

## 📂 Project Structure

```text
Helmet detection system/
 ├── model/
 │    └── best.pt
 ├── src/
 │    └── main.py
 └── requirements.txt
```

---

## ⚙️ Installation

```bash
pip install -r requirements.txt
```

---

## ▶️ Run the Project

```bash
python src/main.py
```

---

## 🖥️ Output

* Green box → Helmet
* Red box → **NO HELMET**

---

## 📌 Future Improvements

* 🔊 Voice alert system (Wear Helmet)
* 🏍️ Bike ignition lock (IoT integration)
* 📱 Mobile app integration
* 😴 Drowsiness detection (eye tracking)

---

## 🧑‍💻 Author

**Taqi AI**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share!
