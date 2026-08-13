from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from app.database import get_db
from app.models.health_check import HealthCheck
from app.schemas.health_check import (
    HealthCheckCreate,
    HealthCheckResponse,
)

router = APIRouter(
    prefix="/health-checks",
    tags=["Health Checks"]
)


def get_health_status(url: str):
    try:
        response = requests.get(
            url,
            timeout=5
        )

        if response.status_code < 400:
            return "Healthy"

        return "Unhealthy"

    except Exception:
        return "Unhealthy"


@router.post(
    "/",
    response_model=HealthCheckResponse
)
def create_health_check(
    health_check: HealthCheckCreate,
    db: Session = Depends(get_db)
):
    status = get_health_status(
        health_check.url
    )

    new_check = HealthCheck(
        url=health_check.url,
        status=status
    )

    db.add(new_check)
    db.commit()
    db.refresh(new_check)

    return new_check


@router.get(
    "/",
    response_model=list[HealthCheckResponse]
)
def get_health_checks(
    db: Session = Depends(get_db)
):
    return db.query(
        HealthCheck
    ).all()


@router.delete("/{check_id}")
def delete_health_check(
    check_id: int,
    db: Session = Depends(get_db)
):
    check = (
        db.query(HealthCheck)
        .filter(HealthCheck.id == check_id)
        .first()
    )

    if not check:
        raise HTTPException(
            status_code=404,
            detail="Health Check not found"
        )

    db.delete(check)
    db.commit()

    return {
        "message": "Deleted successfully"
    }


@router.post("/{check_id}/refresh")
def refresh_health_check(
    check_id: int,
    db: Session = Depends(get_db)
):
    check = (
        db.query(HealthCheck)
        .filter(HealthCheck.id == check_id)
        .first()
    )

    if not check:
        raise HTTPException(
            status_code=404,
            detail="Health Check not found"
        )

    check.status = get_health_status(
        check.url
    )

    db.commit()
    db.refresh(check)

    return check