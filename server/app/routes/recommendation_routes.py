from __future__ import annotations

from fastapi import APIRouter, Query

from app.models.schemas import Recommendation
from app.services.recommendation_service import load_recommendations

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("", response_model=list[Recommendation])
async def get_recommendations(limit: int = Query(50, ge=1, le=500)) -> list[Recommendation]:
    return load_recommendations(limit)
