from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from laun_app.laun_api.laun_routes.laun_auth_router import laun_auth_router
from laun_app.laun_api.laun_routes.laun_users_router import laun_users_router
from laun_app.laun_core.laun_config import laun_settings
from laun_app.laun_db.laun_database import LaunBase, laun_engine
from laun_app.laun_models.laun_user_model import LaunUser

LaunBase.metadata.create_all(bind=laun_engine)

app = FastAPI(title=laun_settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[laun_settings.FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(laun_auth_router, prefix=laun_settings.API_PREFIX)
app.include_router(laun_users_router, prefix=laun_settings.API_PREFIX)


@app.get("/")
def laun_root():
    return {"status": "ok", "project": laun_settings.PROJECT_NAME}
