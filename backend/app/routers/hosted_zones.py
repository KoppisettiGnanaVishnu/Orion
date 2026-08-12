from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hosted_zone import HostedZone
from app.schemas.hosted_zone import (
    HostedZoneCreate,
    HostedZoneUpdate,
    HostedZoneResponse
)

router = APIRouter(
    prefix="/hosted-zones",
    tags=["Hosted Zones"]
)


@router.get("/", response_model=list[HostedZoneResponse])
def get_hosted_zones(db: Session = Depends(get_db)):
    return db.query(HostedZone).all()


@router.post("/", response_model=HostedZoneResponse)
def create_hosted_zone(
    payload: HostedZoneCreate,
    db: Session = Depends(get_db)
):
    zone = HostedZone(
        name=payload.name,
        comment=payload.comment
    )

    db.add(zone)
    db.commit()
    db.refresh(zone)

    return zone


@router.get("/{zone_id}", response_model=HostedZoneResponse)
def get_hosted_zone(
    zone_id: int,
    db: Session = Depends(get_db)
):
    zone = db.query(HostedZone).filter(
        HostedZone.id == zone_id
    ).first()

    if not zone:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    return zone


@router.put("/{zone_id}", response_model=HostedZoneResponse)
def update_hosted_zone(
    zone_id: int,
    payload: HostedZoneUpdate,
    db: Session = Depends(get_db)
):
    zone = db.query(HostedZone).filter(
        HostedZone.id == zone_id
    ).first()

    if not zone:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    zone.name = payload.name
    zone.comment = payload.comment

    db.commit()
    db.refresh(zone)

    return zone


@router.delete("/{zone_id}")
def delete_hosted_zone(
    zone_id: int,
    db: Session = Depends(get_db)
):
    zone = db.query(HostedZone).filter(
        HostedZone.id == zone_id
    ).first()

    if not zone:
        raise HTTPException(
            status_code=404,
            detail="Hosted Zone not found"
        )

    db.delete(zone)
    db.commit()

    return {
        "message": "Hosted Zone deleted"
    }