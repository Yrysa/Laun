from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LaunUserCreate(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=80)
    password: str = Field(min_length=6, max_length=128)


class LaunUserLogin(BaseModel):
    email: EmailStr
    password: str


class LaunUserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LaunTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: LaunUserResponse
