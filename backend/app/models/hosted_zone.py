from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship

from app.database import Base


class HostedZone(Base):
    __tablename__ = "hosted_zones"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    comment = Column(String)

    records = relationship(
        "DNSRecord",
        back_populates="hosted_zone",
        cascade="all, delete"
    )