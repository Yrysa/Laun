from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from laun_app.laun_db.laun_database import LaunBase


class LaunUser(LaunBase):
    __tablename__ = "laun_users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(80), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
