from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from laun_app.laun_core.laun_config import laun_settings

laun_engine = create_engine(laun_settings.DATABASE_URL, pool_pre_ping=True)
LaunSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=laun_engine)
LaunBase = declarative_base()


def laun_get_db():
    db = LaunSessionLocal()
    try:
        yield db
    finally:
        db.close()
