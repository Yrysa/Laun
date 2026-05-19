from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from laun_app.laun_db.laun_database import laun_get_db
from laun_app.laun_schemas.laun_user_schema import LaunTokenResponse, LaunUserCreate, LaunUserLogin, LaunUserResponse
from laun_app.laun_services.laun_auth_service import LaunAuthService

laun_auth_router = APIRouter(prefix="/auth", tags=["laun-auth"])


@laun_auth_router.post("/register", response_model=LaunUserResponse, status_code=status.HTTP_201_CREATED)
def laun_register(payload: LaunUserCreate, db: Session = Depends(laun_get_db)):
    return LaunAuthService.register(db, payload)


@laun_auth_router.post("/login", response_model=LaunTokenResponse)
def laun_login(payload: LaunUserLogin, db: Session = Depends(laun_get_db)):
    return LaunAuthService.login(db, payload)
