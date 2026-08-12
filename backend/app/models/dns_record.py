from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class DNSRecord(Base):
    __tablename__ = "dns_records"

    id = Column(Integer, primary_key=True, index=True)

    zone_id = Column(
        Integer,
        ForeignKey("hosted_zones.id")
    )

    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    value = Column(String, nullable=False)
    ttl = Column(Integer, default=300)

    hosted_zone = relationship(
        "HostedZone",
        back_populates="records"
    )