# 🪖 Smart Helmet System 🚀

An AI-powered smart safety system designed to detect helmet usage using computer vision and improve road safety through real-time monitoring.

🏆 **Achievement:**
Built for **SciFusion Event (20–21 April 2026)** and awarded **🥉 3rd Prize**.

---

# 📌 Features

* 🔍 Real-time helmet detection using YOLOv8
* 🧠 Custom-trained deep learning model
* 🌐 Full-stack web application (Frontend + Backend)
* 🖥️ Interactive GUI for visualization
* ⚡ Efficient and responsive detection pipeline

---

# 🧠 Model Details

* Model: **YOLOv8 (Ultralytics)**
* Type: Custom-trained object detection model
* Dataset: Custom dataset (helmet / no-helmet detection)
* File: `backend/model/best.pt`

---

# 🏗️ Project Structure

```bash
smart-helmet-web-app/
│
├── backend/
│   ├── model/
│   │   └── best.pt
│   ├── src/
│   │   ├── app.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Requirements

## Backend:

* Python 3.x (recommended=3.11)
* Flask
* OpenCV (cv2)
* Ultralytics (YOLOv8)
* NumPy

Install using:

```bash
pip install -r requirements.txt
```

---

## Frontend:

* Node.js (v16+ recommended)
* npm

---

# 🚀 How to Run the Project

## 🔹 Step 1: Run Backend

Open terminal in:

```bash
smart-helmet-web-app/backend/src
```

Run:

```bash
python app.py
```

👉 Backend server will start

---

## 🔹 Step 2: Run Frontend

Open a new terminal in:

```bash
smart-helmet-web-app/frontend
```

Run:

```bash
npm install
npm run dev
```

👉 Frontend will start (usually on localhost)

---

# 🖥️ GUI

The project includes a GUI that allows users to interact with the system and view detection results in a user-friendly manner.

---

# 🎯 Use Cases

* Road safety enforcement
* Helmet compliance monitoring
* Smart traffic systems

---

# 👥 Contributions & Credits

### 🧠 Taqi (AI/ML & Data Pipeline)

* Developed the **YOLOv8-based detection model**
* Performed **data labeling, cleaning, and dataset preparation**
* Contributed to **data collection**
* Worked on **model understanding, training, and optimization**

---

### 🎨 Al Faiz (UI/UX & Frontend)

* Designed and developed the **complete GUI**
* Handled **UI/UX design and frontend implementation**

---

### 🤝 Mayank Awasthi (Coordination & Support)

* Assisted in **data collection**
* Managed **team coordination and workflow**
* Contributed ideas and supported development across modules

---

# 💡 Tech Stack

* Python (Flask)
* OpenCV
* Ultralytics YOLOv8
* JavaScript (Frontend framework)

---

# 📈 Future Scope

* Cloud deployment (real-time monitoring)
* Mobile app integration
* Multi-camera support
* Advanced alert system

---

# ⭐ Note

This project demonstrates practical application of:

* AI/ML (Computer Vision)
* Data preparation and model training
* Full-stack development
* Real-world problem solving

---

If you found this project interesting, consider giving it a ⭐ on GitHub!
