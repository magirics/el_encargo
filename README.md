# El Encargo

Full-stack application built with **Next.js** and **FastAPI**.
You can check it live here.

[Guest](https://el-encargo-yuy6d7xgpq-tl.a.run.app)<br/>
[Host](https://el-encargo-yuy6d7xgpq-tl.a.run.app/host)

## Requirements

* Node.js 22+
* Python 3.12+

## Run locally

### 1. Backend

Create and activate your environment before this
```bash
cd backend

pip install -r requirements.txt
uvicorn main:app --reload
```
Environment variables for the backend
#### `backend/.env`
```
PUBLIC_FRONTEND_URL=http://localhost:3000
```

### 2. Frontend

Open a new terminal:

```bash
cd frontend
pnpm install
pnpm run dev
```

Environment variables for the backend
#### `frontend/.env`
```
PUBLIC_FRONTEND_URL=API_URL=http://127.0.0.1:8000
```

Local: http://localhost:3000
