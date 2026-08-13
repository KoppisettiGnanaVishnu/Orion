from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import models so SQLAlchemy creates tables
from app.models import User
from app.models import HostedZone
from app.models import DNSRecord

from app.routers.hosted_zones import router as hosted_zone_router
from app.routers.dns_records import router as dns_record_router
from app.routers.dashboard import router as dashboard_router
from app.routers import health_checks


# Create database tables
Base.metadata.create_all(bind=engine)


# FastAPI app
app = FastAPI(
    title="Orion API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(hosted_zone_router)
app.include_router(dns_record_router)
app.include_router(
    dashboard_router
)
app.include_router(
    health_checks.router
)


@app.get("/")
def root():
    return {
        "message": "Orion API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }