from pydantic import BaseModel


class HostedZoneCreate(BaseModel):
    name: str
    comment: str


class HostedZoneUpdate(BaseModel):
    name: str
    comment: str


class HostedZoneResponse(BaseModel):
    id: int
    name: str
    comment: str
    record_count: int = 0

    class Config:
        from_attributes = True