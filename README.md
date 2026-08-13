# Orion DNS Manager

A Route53-inspired DNS Management Platform built from scratch using FastAPI, Next.js 15, SQLite, TypeScript, and Shadcn UI.

---

## Project Vision

Most DNS projects stop at simple CRUD operations.

Orion DNS Manager was built with a different objective:

To recreate the workflow, architecture, and user experience of a cloud DNS management platform while maintaining a clean full-stack design.

The focus was not only on managing records, but also on resource hierarchy, authentication, search, pagination, health monitoring, and cloud-style navigation patterns similar to real infrastructure management systems.

---

## Architecture

```text
┌─────────────────────┐
│     Next.js 15      │
│   TypeScript UI     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      FastAPI        │
│   REST Endpoints    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    SQLAlchemy ORM   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      SQLite DB      │
└─────────────────────┘
```

---

## Technology Stack

### Frontend

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Development Tools

- Git
- GitHub
- Swagger UI
- VS Code

---

## Core Features

### Hosted Zone Management

- Create Hosted Zones
- Edit Hosted Zones
- Delete Hosted Zones
- View Hosted Zones
- Search Hosted Zones
- Pagination Support
- Zone Statistics

### DNS Record Management

- Create DNS Records
- View DNS Records
- Delete DNS Records
- TTL Configuration
- Record Validation
- Zone-based Record Isolation

### Platform Features

- Authentication System
- Protected Routes
- Dashboard Overview
- Sidebar Navigation
- Search & Filtering
- Pagination
- Health Checks Module
- Traffic Policies Module
- Resolver Module
- Profiles Module

---

## Resource Model

### Hosted Zone

```text
Hosted Zone
├── ID
├── Domain Name
├── Description
├── Record Count
└── Created Timestamp
```

### DNS Record

```text
DNS Record
├── Name
├── Type
├── Value
├── TTL
└── Hosted Zone ID
```

---

## API Endpoints

### Hosted Zones

| Method | Endpoint |
|----------|----------|
| GET | /hosted-zones |
| POST | /hosted-zones |
| PUT | /hosted-zones/{id} |
| DELETE | /hosted-zones/{id} |

### DNS Records

| Method | Endpoint |
|----------|----------|
| GET | /records/zone/{zone_id} |
| POST | /records/{zone_id} |
| DELETE | /records/{record_id} |

### Health Checks

| Method | Endpoint |
|----------|----------|
| GET | /health-checks |
| POST | /health-checks |

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
│   │   ├── database.py
│   │   └── main.py
│   │
│   └── run.py
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   ├── zone/
│   │   ├── health-checks/
│   │   ├── resolver/
│   │   ├── profiles/
│   │   └── traffic-policies/
│   │
│   ├── components/
│   ├── lib/
│   └── package.json
│
└── README.md
```

---

## Current Implementation Status

| Module | Status |
|----------|----------|
| Authentication | Complete |
| Hosted Zone CRUD | Complete |
| DNS Record CRUD | Complete |
| Search | Complete |
| Pagination | Complete |
| Dashboard | Complete |
| Sidebar Navigation | Complete |
| Health Checks | Complete |
| Traffic Policies | Complete |
| Resolver | Complete |
| Profiles | Complete |

---

## Engineering Decisions

### Why FastAPI?

- Automatic API documentation
- Strong validation through Pydantic
- Excellent performance
- Clean router architecture

### Why Next.js?

- Modern App Router architecture
- Excellent TypeScript support
- Component-based design
- Production-ready routing

### Why SQLite?

For this stage of development the priority was application architecture and functionality.

The database layer is abstracted through SQLAlchemy, making migration to PostgreSQL straightforward in future iterations.

---

## Design Principles

The project was built around four key ideas:

### Resource-Oriented Design

Hosted Zones and DNS Records are treated as infrastructure resources rather than simple database entries.

### Separation of Concerns

Frontend, API, validation, database models, and business logic remain isolated and maintainable.

### Cloud-Inspired UX

Navigation, resource hierarchy, management workflows, and dashboard patterns are inspired by real cloud control planes.

### Scalability First

The architecture allows future migration to PostgreSQL, Redis, background workers, and containerized deployment with minimal structural changes.

---

## Running Locally

### Backend

```bash
cd backend

source venv/bin/activate

python run.py
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

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

## Future Enhancements

- DNS Record Editing
- Advanced Record Types
- User Role Management
- PostgreSQL Migration
- Redis Caching
- Audit Logs
- Route Analytics
- Monitoring Dashboard
- Terraform-style Export
- Container Deployment

---

## Key Learnings

Building Orion required solving challenges across:

- API Design
- Database Modeling
- Authentication
- Resource Relationships
- State Management
- Search & Pagination
- Full-Stack Integration
- Cloud Service User Experience

The project was ultimately an exercise in designing a cloud-inspired infrastructure management platform rather than a traditional CRUD application.

---

## Author

**Koppisetti Gnana Vishnu**

B.Tech Computer Science & Engineering

FastAPI • Next.js • TypeScript • SQLAlchemy • SQLite
