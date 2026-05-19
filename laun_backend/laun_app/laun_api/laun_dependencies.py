from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from laun_app.laun_core.laun_config import laun_settings
from laun_app.laun_db.laun_database import laun_get_db
from laun_app.laun_models.laun_user_model import LaunUser

laun_bearer_security = HTTPBearer()


def laun_get_current_user(credentials: HTTPAuthorizationCredentials = Depends(laun_bearer_security), db: Session = Depends(laun_get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, laun_settings.SECRET_KEY, algorithms=[laun_settings.JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(LaunUser).filter(LaunUser.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user
