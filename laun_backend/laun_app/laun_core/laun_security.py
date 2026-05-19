from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

from laun_app.laun_core.laun_config import laun_settings

laun_password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def laun_hash_password(password: str) -> str:
    return laun_password_context.hash(password)


def laun_verify_password(password: str, hashed_password: str) -> bool:
    return laun_password_context.verify(password, hashed_password)


def laun_create_access_token(subject: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=laun_settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, laun_settings.SECRET_KEY, algorithm=laun_settings.JWT_ALGORITHM)
