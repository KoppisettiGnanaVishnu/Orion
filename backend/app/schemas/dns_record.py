from pydantic import BaseModel, Field, field_validator

VALID_RECORD_TYPES = [
    "A",
    "AAAA",
    "CNAME",
    "TXT",
    "MX",
    "NS",
    "PTR",
    "SRV",
    "CAA",
]


class DNSRecordCreate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=255
    )

    type: str

    value: str = Field(
        min_length=1,
        max_length=500
    )

    ttl: int = Field(
        default=300,
        ge=60,
        le=86400
    )

    @field_validator("type")
    @classmethod
    def validate_type(cls, value):
        value = value.upper()

        if value not in VALID_RECORD_TYPES:
            raise ValueError(
                f"Record type must be one of {VALID_RECORD_TYPES}"
            )

        return value


class DNSRecordUpdate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=255
    )

    type: str

    value: str = Field(
        min_length=1,
        max_length=500
    )

    ttl: int = Field(
        ge=60,
        le=86400
    )

    @field_validator("type")
    @classmethod
    def validate_type(cls, value):
        value = value.upper()

        if value not in VALID_RECORD_TYPES:
            raise ValueError(
                f"Record type must be one of {VALID_RECORD_TYPES}"
            )

        return value


class DNSRecordResponse(BaseModel):
    id: int
    zone_id: int
    name: str
    type: str
    value: str
    ttl: int

    class Config:
        from_attributes = True