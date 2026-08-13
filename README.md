# Orion DNS

A production-ready DNS Management Platform inspired by AWS Route 53, built using FastAPI, Next.js, SQLite, and ShadCN UI.

Orion DNS enables users to create and manage hosted zones, configure DNS records, monitor endpoint health, and visualize DNS infrastructure through a modern cloud-native interface.

---

## Why Orion DNS?

DNS is one of the most critical services powering the modern internet. Every application, website, API, and cloud service depends on reliable DNS infrastructure.

Orion DNS was built as a functional Route53-inspired platform to explore how DNS systems work behind the scenes while providing a complete full-stack cloud application experience.

This project demonstrates:

- REST API Design
- Database Modeling
- Frontend-Backend Integration
- Cloud Deployment
- DNS Infrastructure Concepts
- Production-Ready Architecture

Rather than building a simple CRUD application, Orion DNS simulates real-world cloud DNS workflows similar to AWS Route 53.

---

## Live Deployment

### Frontend (Vercel)

https://YOUR-VERCEL-URL.vercel.app

### Backend API (Render)

https://orion-api-e0cc.onrender.com

### Swagger Documentation

https://orion-api-e0cc.onrender.com/docs

---

## Features

### Hosted Zone Management

- Create Hosted Zones
- Update Hosted Zones
- Delete Hosted Zones
- Search Hosted Zones
- Zone Details View
- Record Count Tracking

### DNS Record Management

- Create DNS Records
- Update DNS Records
- Delete DNS Records
- Search DNS Records
- TTL Configuration

Supported Record Types:

- A
- AAAA
- CNAME
- TXT
- MX
- NS
- PTR
- SRV
- CAA

### Dashboard

- Infrastructure Overview
- Total Hosted Zones
- Total DNS Records
- Total Health Checks
- Real-Time Statistics

### Health Checks

- Create Health Checks
- Monitor Endpoint Availability
- Health Status Tracking
- Health Check Management

### Authentication

- Login Page
- Protected Routes
- Session-Based Access

### User Experience

- Responsive Design
- Modern Dashboard
- AWS Route53-Inspired Layout
- Search & Filtering
- Notifications & Alerts
- Sidebar Navigation

---

## System Architecture

```text
                        ┌─────────────────┐
                        │     User        │
                        └────────┬────────┘
                                 │
                                 ▼
                  ┌──────────────────────────┐
                  │     Next.js Frontend     │
                  │        (Vercel)          │
                  └──────────┬───────────────┘
                             │
                             ▼
                  ┌──────────────────────────┐
                  │      FastAPI Backend     │
                  │        (Render)          │
                  └──────────┬───────────────┘
                             │
                             ▼
                  ┌──────────────────────────┐
                  │      SQLAlchemy ORM      │
                  └──────────┬───────────────┘
                             │
                             ▼
                  ┌──────────────────────────┐
                  │      SQLite Database     │
                  └──────────────────────────┘
```

---

## Tech Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- ShadCN UI
- Axios

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Deployment

- Vercel
- Render

### Development Tools

- Git
- GitHub
- VS Code

---

## API Endpoints

### Hosted Zones

| Method | Endpoint |
|----------|----------|
| GET | `/hosted-zones/` |
| GET | `/hosted-zones/{id}` |
| POST | `/hosted-zones/` |
| PUT | `/hosted-zones/{id}` |
| DELETE | `/hosted-zones/{id}` |

---

### DNS Records

| Method | Endpoint |
|----------|----------|
| GET | `/records/zone/{zone_id}` |
| POST | `/records/{zone_id}` |
| PUT | `/records/{record_id}` |
| DELETE | `/records/{record_id}` |

---

### Dashboard

| Method | Endpoint |
|----------|----------|
| GET | `/dashboard/stats` |

---

### Health Checks

| Method | Endpoint |
|----------|----------|
| GET | `/health-checks/` |
| POST | `/health-checks/` |
| DELETE | `/health-checks/{id}` |

---

## Project Structure

```text
orion/
│
├── backend/
│   │
│   ├── app/
│   │   ├── database.py
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── utils/
│   │
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   ├── health-checks/
│   │   ├── login/
│   │   ├── resolver/
│   │   ├── traffic-policies/
│   │   ├── zone/
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Screenshots

### Login

![Login](./frontend/public/screenshots/login.png)

### Dashboard

![Dashboard](./frontend/public/screenshots/dashboard.png)

### Hosted Zones

![Hosted Zones](./frontend/public/screenshots/hosted-zones.png)

### DNS Records

![DNS Records](./frontend/public/screenshots/zone-details.png)

### Health Checks

![Health Checks](./frontend/public/screenshots/health-checks.png)

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Orion.git

cd Orion
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python run.py
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

### Frontend Setup

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

## Deployment

### Frontend

Hosted on Vercel

```text
https://YOUR-VERCEL-URL.vercel.app
```

### Backend

Hosted on Render

```text
https://orion-api-e0cc.onrender.com
```

### API Documentation

```text
https://orion-api-e0cc.onrender.com/docs
```

---

## Project Status

### Current Version

```text
v1.0.0
```

### Completed

- Hosted Zone CRUD
- DNS Record CRUD
- Health Checks
- Dashboard APIs
- Authentication
- Frontend Deployment
- Backend Deployment
- API Documentation
- Search & Filtering
- Route53-Inspired UI

### Planned Enhancements

- Traffic Policies
- Resolver Rules
- Advanced Routing Strategies
- Role-Based Access Control
- Analytics Dashboard
- Audit Logs
- Monitoring & Metrics

---

## Learning Outcomes

This project helped explore:

- FastAPI Backend Development
- SQLAlchemy ORM
- REST API Design
- Frontend Architecture with Next.js
- ShadCN UI Components
- Database Relationships
- Cloud Deployment Workflows
- DNS Infrastructure Concepts
- Full-Stack System Design

---

## Author

### Koppisetti Gnana Vishnu

B.Tech Computer Science Engineering

GitHub:
https://github.com/KoppisettiGnanaVishnu

---

## Acknowledgements

Inspired by AWS Route 53 and modern cloud infrastructure management platforms.

Built as a full-stack engineering project to understand DNS systems, scalable API design, and production deployment workflows.
