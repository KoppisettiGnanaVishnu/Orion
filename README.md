#                                                                     Orion DNS Manager

<div align="center">

### A Route53-Inspired DNS Management Platform

Built with **FastAPI**, **Next.js 15**, **SQLite**, **TypeScript**, and **Shadcn UI**

Designed to recreate the core experience of AWS Route53 while providing a modern full-stack architecture, persistent storage, authentication, health monitoring, and DNS management capabilities.

</div>

---

# 📖 Overview

Orion DNS Manager is a cloud-inspired DNS management platform that replicates the core functionality and workflow of AWS Route53.

The application enables users to manage Hosted Zones and DNS Records through a modern web interface while maintaining persistent infrastructure state using SQLite.

Rather than building a generic CRUD application, the objective was to recreate the operational experience of a DNS management service, including navigation patterns, resource hierarchy, authentication, search, filtering, pagination, notifications, and health monitoring.

---

# 🎯 Design Philosophy

The goal of Orion DNS Manager was not simply to implement CRUD operations.

The focus was to create an application that feels similar to a real cloud networking platform.

Key principles followed during development:

- Clear resource ownership (Hosted Zones → DNS Records)
- Route53-inspired navigation and workflows
- Persistent infrastructure state
- Simple but scalable backend architecture
- Modern frontend user experience
- Expandability for future cloud networking features

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
- Automatic Redirects
- Local Storage Session Handling

---

## ❤️ Health Checks

- Create Health Checks
- View Health Checks
- Delete Health Checks
- Status Monitoring
- Dashboard Metrics

---

## 🎨 Route53 Experience

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

# 📊 Project Statistics

| Metric | Value |
|----------|----------|
| Hosted Zone CRUD | ✅ |
| DNS Record CRUD | ✅ |
| Supported Record Types | 9 |
| Authentication System | ✅ |
| Health Checks | ✅ |
| SQLite Persistence | ✅ |
| Protected Routes | ✅ |
| Pagination | ✅ |
| Search & Filtering | ✅ |
| REST APIs | ✅ |

---

# 🏗 System Architecture

```text
┌─────────────────────────┐
│       Next.js UI        │
│      TypeScript App     │
└────────────┬────────────┘
             │
             │ REST API
             ▼
┌─────────────────────────┐
│         FastAPI         │
│      Route Handlers     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│     SQLAlchemy ORM      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│       SQLite DB         │
└─────────────────────────┘
```

---

# ⚙️ Engineering Decisions

## Why FastAPI?

FastAPI provides:

- High performance
- Automatic OpenAPI documentation
- Strong request validation using Pydantic
- Clean REST API development

---

## Why SQLite?

SQLite was selected because:

- Lightweight and portable
- Persistent storage
- Zero external dependencies
- Perfect for assignment evaluation and local execution

---

## Why Next.js?

Next.js provides:

- Component-based architecture
- Modern routing system
- Fast rendering
- Scalable frontend structure

---

## Why Shadcn UI?

Shadcn UI helped achieve:

- Professional cloud-console appearance
- Reusable components
- High customization
- Modern design patterns

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
- Pydantic
- SQLite

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

# 📸 Screenshots

## Login Page

_Add Screenshot_

---

## Hosted Zones Dashboard

_Add Screenshot_

---

## DNS Record Management

_Add Screenshot_

---

## Health Checks

_Add Screenshot_

---

## Route53-Inspired Navigation

_Add Screenshot_

---

# ✅ Assignment Requirement Mapping

| Assignment Requirement | Status |
|----------|----------|
| Hosted Zone CRUD | ✅ Complete |
| DNS Record CRUD | ✅ Complete |
| Authentication | ✅ Complete |
| Session Persistence | ✅ Complete |
| SQLite Persistence | ✅ Complete |
| Search Functionality | ✅ Complete |
| Filters | ✅ Complete |
| Pagination | ✅ Complete |
| Notifications | ✅ Complete |
| Health Checks | ✅ Complete |
| Route53 Navigation Structure | ✅ Complete |
| Route53-style Experience | ✅ Complete |

---

# 🚧 Challenges & Learnings

During development several engineering challenges were encountered:

- Designing relationships between Hosted Zones and DNS Records
- Maintaining frontend and backend state consistency
- Implementing Route53-style navigation patterns
- Supporting multiple DNS record types through validation layers
- Building protected routes with session persistence
- Creating a scalable structure for future Route53 features

This project provided practical experience in building a full-stack cloud-inspired management platform using modern technologies.

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

Backend:

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

Frontend:

```text
http://localhost:3000
```

---

# 🔑 Demo Credentials

```text
Username: admin
Password: admin
```

(Mock Authentication)

---

# 🔮 Beyond The Assignment

Given additional development time, the following features would be implemented:

- Route53 Resolver Simulation
- Traffic Routing Policies
- Weighted Routing
- Latency-based Routing
- Failover Routing
- Geolocation Routing
- DNS Analytics Dashboard
- Query Monitoring
- Audit Logging
- Role-Based Access Control
- Multi-User Organizations
- Cloud Database Support

---

# 👨‍💻 Developer

### Koppisetti Gnana Vishnu

B.Tech — Computer Science & Engineering

Focused on:

- Full Stack Development
- Cloud Platforms
- System Design
- Scalable Applications

GitHub:
https://github.com/KoppisettiGnanaVishnu

---

<div align="center">

### ⭐ Built as a Route53 Clone using FastAPI + Next.js

</div>
