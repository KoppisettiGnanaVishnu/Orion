# Orion

A Route 53-inspired DNS Management Platform built with FastAPI, SQLAlchemy, and SQLite.

Orion allows users to manage Hosted Zones and DNS Records through a RESTful API, providing the foundation for a cloud-based DNS management service similar to AWS Route 53.

---

## Features

### Hosted Zone Management
- Create Hosted Zones
- View all Hosted Zones
- Retrieve a single Hosted Zone
- Update Hosted Zone details
- Delete Hosted Zones

### DNS Record Management
- Create DNS Records
- View DNS Records for a Hosted Zone
- Retrieve a specific DNS Record
- Update DNS Records
- Delete DNS Records

### API Documentation
- Interactive Swagger UI
- OpenAPI Specification
- Automatic Request Validation

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Development Tools
- Python 3.13
- Uvicorn
- Git & GitHub

---

## Project Structure

```text
backend/
│
├── app/
│   ├── models/
│   │   ├── user.py
│   │   ├── hosted_zone.py
│   │   └── dns_record.py
│   │
│   ├── routers/
│   │   ├── hosted_zones.py
│   │   └── dns_records.py
│   │
│   ├── schemas/
│   │   ├── hosted_zone.py
│   │   └── dns_record.py
│   │
│   ├── database.py
│   └── main.py
│
├── run.py
├── requirements.txt
└── orion.db
