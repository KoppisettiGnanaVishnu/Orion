from fastapi import FastAPI

from app.database import Base, engine

from app.models import User
from app.models import HostedZone
from app.models import DNSRecord

from app.routers.hosted_zones import router as hosted_zone_router
from app.routers.dns_records import router as dns_record_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Orion API",
    version="1.0.0"
)

app.include_router(hosted_zone_router)
app.include_router(dns_record_router)


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