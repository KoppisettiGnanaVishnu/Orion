# Orion DNS Manager

<div align="center">

# 🚀 Orion DNS Manager

### Route53-Inspired DNS Management Platform

A full-stack DNS Management Platform inspired by **AWS Route53**, built using **FastAPI**, **Next.js**, **SQLite**, **TypeScript**, and **Shadcn UI**.

Designed to provide Hosted Zone management, DNS Record management, Authentication, Health Checks, Search, Filtering, Pagination, and a Route53-style user experience.

</div>

---

# 📌 Overview

Orion DNS Manager is a cloud-inspired DNS administration platform that replicates the core experience of AWS Route53.

The platform allows users to manage Hosted Zones and DNS Records through an intuitive web interface while persisting all data in SQLite.

The application follows a modern full-stack architecture:

- Frontend built with Next.js 15 and TypeScript
- Backend built with FastAPI
- SQLite database for persistence
- REST API communication
- Route53-inspired UI and navigation
- Authentication with session persistence

---

# ✨ Features

## 🌐 Hosted Zone Management

- Create Hosted Zones
- View Hosted Zones
- Search Hosted Zones
- Edit Hosted Zones
- Delete Hosted Zones
- Persistent SQLite Storage

---

## 📄 DNS Record Management

- Create DNS Records
- View DNS Records
- Search DNS Records
- Edit DNS Records
- Delete DNS Records
- TTL Configuration

---

## 🛡 Supported DNS Record Types

- A
- AAAA
- CNAME
- TXT
- MX
- NS
- PTR
- SRV
- CAA

---

## 🔐 Authentication

- Mock Login
- Logout
- Session Persistence
- Protected Routes
- Automatic Redirect to Login
- Local Storage Session Handling

---

## ❤️ Health Checks

- Create Health Checks
- View Health Checks
- Delete Health Checks
- Status Monitoring
- Dashboard Metrics

---

## 🎯 Route53 Experience

- Sidebar Navigation
- Route53-style Layout
- Search
- Filters
- Pagination
- Notifications
- Responsive Design
- Dashboard Navigation
- Hosted Zone Management
- DNS Record Management

---

# 🏗 System Architecture

```text
┌─────────────────────┐
│     Next.js UI      │
│  TypeScript Client  │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│      FastAPI        │
│   Route Handlers    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   SQLAlchemy ORM    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      SQLite DB      │
└─────────────────────┘
```

---

# 🛠 Technology Stack

## Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## Database

- SQLite

---

# 📂 Project Structure

```text
orion/
│
├── backend/
│   │
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   └── run.py
│
├── frontend/
│   │
│   ├── app/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── health-checks/
│   │   ├── resolver/
│   │   ├── profiles/
│   │   ├── traffic-policies/
│   │   ├── zone/
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── lib/
│   └── package.json
│
└── README.md
```

---

# 📡 API Endpoints

## Hosted Zones

| Method | Endpoint |
|----------|----------|
| GET | `/hosted-zones` |
| POST | `/hosted-zones` |
| PUT | `/hosted-zones/{id}` |
| DELETE | `/hosted-zones/{id}` |

---

## DNS Records

| Method | Endpoint |
|----------|----------|
| GET | `/records/zone/{zone_id}` |
| POST | `/records/{zone_id}` |
| PUT | `/records/{record_id}` |
| DELETE | `/records/{record_id}` |

---

## Health Checks

| Method | Endpoint |
|----------|----------|
| GET | `/health-checks` |
| POST | `/health-checks` |
| DELETE | `/health-checks/{id}` |

---

# 📸 Application Screenshots

## Login Page

_Add screenshot here_

```text
frontend/public/screenshots/login.png
```

---

## Hosted Zones Dashboard

_Add screenshot here_

```text
frontend/public/screenshots/hosted-zones.png
```

---

## DNS Record Management

_Add screenshot here_

```text
frontend/public/screenshots/dns-records.png
```

---

## Health Checks

_Add screenshot here_

```text
frontend/public/screenshots/health-checks.png
```

---

# ✅ Assignment Requirements Coverage

| Requirement | Status |
|------------|--------|
| Hosted Zone CRUD | ✅ Complete |
| DNS Record CRUD | ✅ Complete |
| Authentication | ✅ Complete |
| Session Persistence | ✅ Complete |
| SQLite Persistence | ✅ Complete |
| Search Functionality | ✅ Complete |
| Filters | ✅ Complete |
| Pagination | ✅ Complete |
| Notifications | ✅ Complete |
| Route53 Navigation | ✅ Complete |
| Health Checks | ✅ Complete |
| Route53-style Experience | ✅ Complete |

---

# 🚀 Running Locally

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python run.py
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

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

# 🔑 Demo Credentials

```text
Username: admin
Password: admin
```

(Used for mocked authentication)

---

# 🔮 Future Improvements

- Route53 Resolver Simulation
- Traffic Policy Engine
- DNS Analytics Dashboard
- Query Monitoring
- Audit Logs
- Role-Based Access Control
- Multi-User Support
- Cloud Database Integration

---

# 👨‍💻 Author

### Koppisetti Gnana Vishnu

B.Tech – Computer Science & Engineering

GitHub: https://github.com/KoppisettiGnanaVishnu

---

<div align="center">

### ⭐ Built as a Route53 Clone Assignment using FastAPI + Next.js

</div>
