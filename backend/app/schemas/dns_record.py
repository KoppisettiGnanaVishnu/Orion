from pydantic import BaseModel


class DNSRecordCreate(BaseModel):
    name: str
    type: str
    value: str
    ttl: int = 300


class DNSRecordUpdate(BaseModel):
    name: str
    type: str
    value: str
    ttl: int


class DNSRecordResponse(BaseModel):
    id: int
    zone_id: int
    name: str
    type: str
    value: str
    ttl: int

    class Config:
        from_attributes = True