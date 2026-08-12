from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dns_record import DNSRecord
from app.models.hosted_zone import HostedZone

from app.schemas.dns_record import (
    DNSRecordCreate,
    DNSRecordUpdate,
    DNSRecordResponse
)

router = APIRouter(
    prefix="/records",
    tags=["DNS Records"]
)


@router.post("/{zone_id}", response_model=DNSRecordResponse)
def create_record(
    zone_id: int,
    payload: DNSRecordCreate,
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

    record = DNSRecord(
        zone_id=zone_id,
        name=payload.name,
        type=payload.type,
        value=payload.value,
        ttl=payload.ttl
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


@router.get("/zone/{zone_id}", response_model=list[DNSRecordResponse])
def get_records(
    zone_id: int,
    db: Session = Depends(get_db)
):

    return db.query(DNSRecord).filter(
        DNSRecord.zone_id == zone_id
    ).all()


@router.get("/{record_id}", response_model=DNSRecordResponse)
def get_record(
    record_id: int,
    db: Session = Depends(get_db)
):

    record = db.query(DNSRecord).filter(
        DNSRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    return record


@router.put("/{record_id}", response_model=DNSRecordResponse)
def update_record(
    record_id: int,
    payload: DNSRecordUpdate,
    db: Session = Depends(get_db)
):

    record = db.query(DNSRecord).filter(
        DNSRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    record.name = payload.name
    record.type = payload.type
    record.value = payload.value
    record.ttl = payload.ttl

    db.commit()
    db.refresh(record)

    return record


@router.delete("/{record_id}")
def delete_record(
    record_id: int,
    db: Session = Depends(get_db)
):

    record = db.query(DNSRecord).filter(
        DNSRecord.id == record_id
    ).first()

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    db.delete(record)
    db.commit()

    return {
        "message": "Record deleted"
    }