@echo off
echo Starting Smart Helmet System...

echo Starting Backend...
start cmd /k "cd backend && pip install -r requirements.txt && python src/app.py"

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo Both services are starting up!
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:5173 (usually)
pause
