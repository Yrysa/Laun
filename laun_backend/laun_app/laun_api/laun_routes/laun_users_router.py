from fastapi import APIRouter, Depends

from laun_app.laun_api.laun_dependencies import laun_get_current_user
from laun_app.laun_schemas.laun_user_schema import LaunUserResponse

laun_users_router = APIRouter(prefix="/users", tags=["laun-users"])


@laun_users_router.get("/me", response_model=LaunUserResponse)
def laun_profile(current_user=Depends(laun_get_current_user)):
    return current_user
