from sqlalchemy import Column, Integer, String, Float
from database import Base

class QueueEntry(Base):
    __tablename__ = "queue"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    people = Column(Integer, nullable=False)
    time = Column(Float, nullable=False)
    status = Column(String, default="waiting")