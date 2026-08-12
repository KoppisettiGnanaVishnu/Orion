from pydantic import BaseModel


class HostedZoneCreate(BaseModel):
    name: str
    comment: str | None = None


class HostedZoneUpdate(BaseModel):
    name: str
    comment: str | None = None


class HostedZoneResponse(BaseModel):
    id: int
    name: str
    comment: str | None = None

    class Config:
        from_attributes = True