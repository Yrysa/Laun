from pydantic_settings import BaseSettings, SettingsConfigDict


class LaunSettings(BaseSettings):
    PROJECT_NAME: str = "Laun"
    API_PREFIX: str = "/api"
    DATABASE_URL: str
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    FRONTEND_URL: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env.example", env_file_encoding="utf-8")


laun_settings = LaunSettings()
