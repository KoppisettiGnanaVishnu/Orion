from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hosted_zone import HostedZone
from app.models.dns_record import DNSRecord
from app.models.health_check import HealthCheck

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):
    hosted_zones = db.query(
        HostedZone
    ).count()

    dns_records = db.query(
        DNSRecord
    ).count()

    health_checks = db.query(
        HealthCheck
    ).count()

    healthy_checks = db.query(
        HealthCheck
    ).filter(
        HealthCheck.status == "Healthy"
    ).count()

    unhealthy_checks = db.query(
        HealthCheck
    ).filter(
        HealthCheck.status == "Unhealthy"
    ).count()

    return {
        "hosted_zones": hosted_zones,
        "dns_records": dns_records,
        "health_checks": health_checks,
        "healthy_checks": healthy_checks,
        "unhealthy_checks": unhealthy_checks,
    }