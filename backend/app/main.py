from contextlib import asynccontextmanager
from datetime import datetime, timezone
import os
from typing import Literal

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import DateTime, Integer, String, Text, create_engine, func, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./mock_dev.db",
)
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class Problem(Base):
    __tablename__ = "problems"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(240), index=True)
    module: Mapped[str] = mapped_column(String(32), index=True)
    category: Mapped[str] = mapped_column(String(100), default="General", index=True)
    difficulty: Mapped[str] = mapped_column(String(20), default="Medium", index=True)
    summary: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class ProblemCreate(BaseModel):
    slug: str = Field(min_length=2, max_length=160, pattern=r"^[a-z0-9-]+$")
    title: str = Field(min_length=2, max_length=240)
    module: Literal["HLD", "LLD", "DSA", "Frontend", "OA", "CS"]
    category: str = Field(default="General", max_length=100)
    difficulty: Literal["Easy", "Medium", "Hard"] = "Medium"
    summary: str = Field(default="", max_length=10000)


class ProblemOut(ProblemCreate):
    id: int

    model_config = {"from_attributes": True}


@asynccontextmanager
async def lifespan(_: FastAPI):
    # A small bootstrap schema for the starter. Use Alembic migrations before
    # production deployment; avoid create_all as a production migration strategy.
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.scalar(select(func.count()).select_from(Problem)) == 0:
            db.add_all([
                Problem(
                    slug="design-url-shortener",
                    title="Design a URL Shortener",
                    module="HLD",
                    category="Fundamentals & Key-Value",
                    difficulty="Medium",
                    summary="Design a service that maps short links to long URLs. Define requirements, APIs, storage, redirects, and scaling trade-offs.",
                ),
                Problem(
                    slug="design-parking-lot",
                    title="Design a Parking Lot",
                    module="LLD",
                    category="Object-Oriented Design",
                    difficulty="Medium",
                    summary="Model vehicles, parking spaces, floors, tickets, entry/exit flows, and fee calculation. Explain the responsibilities of each class.",
                ),
                Problem(
                    slug="two-sum",
                    title="Two Sum",
                    module="DSA",
                    category="Arrays & Hashing",
                    difficulty="Easy",
                    summary="Given an integer array and a target, return the indices of two distinct elements whose values add up to the target.",
                ),
            ])
            db.commit()
    yield
    engine.dispose()


app = FastAPI(
    title="MOCK API",
    description="Personal interview preparation platform API",
    version="0.1.0",
    lifespan=lifespan,
)

origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health():
    return {"status": "ok", "service": "mock-api"}


@app.get("/api/v1/problems", response_model=list[ProblemOut])
def list_problems(
    module: str | None = Query(default=None),
    category: str | None = Query(default=None),
    difficulty: str | None = Query(default=None),
    search: str | None = Query(default=None, max_length=120),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    query = select(Problem)
    if module:
        query = query.where(Problem.module == module)
    if category:
        query = query.where(Problem.category == category)
    if difficulty:
        query = query.where(Problem.difficulty == difficulty)
    if search:
        query = query.where(Problem.title.ilike(f"%{search}%"))
    return list(db.scalars(query.order_by(Problem.id).offset(offset).limit(limit)).all())


@app.get("/api/v1/problems/{slug}", response_model=ProblemOut)
def get_problem(slug: str, db: Session = Depends(get_db)):
    problem = db.scalar(select(Problem).where(Problem.slug == slug))
    if problem is None:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem


@app.post("/api/v1/problems", response_model=ProblemOut, status_code=201)
def create_problem(payload: ProblemCreate, db: Session = Depends(get_db)):
    if db.scalar(select(Problem.id).where(Problem.slug == payload.slug)) is not None:
        raise HTTPException(status_code=409, detail="A problem with this slug already exists")
    problem = Problem(**payload.model_dump())
    db.add(problem)
    db.commit()
    db.refresh(problem)
    return problem
