# Laun

Backend: FastAPI, Python, SQLAlchemy, PostgreSQL, JWT
Frontend: React, Vite, Redux Toolkit, Axios
Database: PostgreSQL

```bash
docker compose up --build
```

```bash
cd laun_backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn laun_app.laun_main:app --reload
```

```bash
cd laun_frontend
npm install
npm run dev
```

API: http://localhost:8000
Frontend: http://localhost:5173
