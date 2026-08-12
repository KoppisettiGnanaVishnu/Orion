# Orion DNS Manager

A Route53-inspired DNS Management Platform built using FastAPI, Next.js, SQLite, and Shadcn UI.

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios

---

## Features

### Hosted Zone Management
- Create Hosted Zones
- List Hosted Zones
- Delete Hosted Zones
- View Hosted Zone Details

### DNS Record Management
- Create DNS Records
- View DNS Records
- Delete DNS Records
- TTL Configuration
- Record Type Support (A Records)

---

## Project Structure

```text
orion/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── database.py
│   │
│   ├── main.py
│   └── run.py
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── zone/[id]/page.tsx
│   │
│   ├── components/
│   ├── lib/
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Hosted Zones

| Method | Endpoint |
|----------|----------|
| GET | /hosted-zones |
| POST | /hosted-zones |
| DELETE | /hosted-zones/{id} |

### DNS Records

| Method | Endpoint |
|----------|----------|
| GET | /records/zone/{zone_id} |
| POST | /records/{zone_id} |
| DELETE | /records/{record_id} |

---

## Current Status

### Phase 1
- Backend Setup
- Database Setup
- Hosted Zone CRUD

### Phase 2
- DNS Record CRUD
- Frontend Integration
- Route Navigation

### Upcoming
- Route53 Dashboard UI
- Sidebar Navigation
- Record Editing
- Search & Filtering
- Health Checks
- Query Logging

---

## Running Locally

### Backend

```bash
cd backend

source venv/bin/activate

python run.py
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Author

Koppisetti Gnana Vishnu
