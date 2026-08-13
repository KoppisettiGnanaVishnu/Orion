from pydantic import BaseModel


class HealthCheckCreate(BaseModel):
    url: str


class HealthCheckResponse(BaseModel):
    id: int
    url: str
    status: str

    class Config:
        from_attributes = True