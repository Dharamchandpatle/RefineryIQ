from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt
from passlib.context import CryptContext

from app.config import settings
from app.db.mongodb import get_db
from app.models.schemas import Token, UserCreate, UserLogin, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _hash_password(password: str) -> str:
    return pwd_context.hash(password)


def _verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def _create_access_token(subject: str) -> tuple[str, int]:
    expires_delta = timedelta(minutes=settings.jwt_expire_minutes)
    expire = datetime.now(timezone.utc) + expires_delta
    payload = {"sub": subject, "exp": expire}
    token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return token, int(expires_delta.total_seconds())


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db=Depends(get_db)) -> UserOut:
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    payload = {
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "hashed_password": _hash_password(user.password),
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(payload)

    return UserOut(id=str(result.inserted_id), created_at=payload["created_at"], **user.model_dump())


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db=Depends(get_db)) -> Token:
    user = await db.users.find_one({"email": credentials.email})
    if not user or not _verify_password(credentials.password, user.get("hashed_password", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token, expires_in = _create_access_token(subject=str(user.get("_id")))
    return Token(access_token=token, expires_in=expires_in)
