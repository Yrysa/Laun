from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from laun_app.laun_core.laun_security import laun_create_access_token, laun_hash_password, laun_verify_password
from laun_app.laun_models.laun_user_model import LaunUser
from laun_app.laun_schemas.laun_user_schema import LaunUserCreate, LaunUserLogin


class LaunAuthService:
    @staticmethod
    def register(db: Session, payload: LaunUserCreate) -> LaunUser:
        user_by_email = db.query(LaunUser).filter(LaunUser.email == payload.email).first()
        if user_by_email:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already exists")

        user_by_username = db.query(LaunUser).filter(LaunUser.username == payload.username).first()
        if user_by_username:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists")

        user = LaunUser(email=payload.email, username=payload.username, hashed_password=laun_hash_password(payload.password))
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def login(db: Session, payload: LaunUserLogin) -> dict:
        user = db.query(LaunUser).filter(LaunUser.email == payload.email).first()
        if not user or not laun_verify_password(payload.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User is inactive")
        token = laun_create_access_token(str(user.id))
        return {"access_token": token, "token_type": "bearer", "user": user}
