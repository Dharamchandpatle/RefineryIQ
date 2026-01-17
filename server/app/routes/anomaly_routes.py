from __future__ import annotations

from fastapi import APIRouter, Query

from app.models.schemas import Alert, AnomalyRecord
from app.services.anomaly_service import build_alerts, load_anomalies

router = APIRouter(prefix="/anomalies", tags=["anomalies"])


@router.get("", response_model=list[AnomalyRecord])
async def get_anomalies(limit: int = Query(100, ge=1, le=1000)) -> list[AnomalyRecord]:
    return load_anomalies(limit)


@router.get("/alerts", response_model=list[Alert])
async def get_alerts(limit: int = Query(100, ge=1, le=1000)) -> list[Alert]:
    return build_alerts(limit)
