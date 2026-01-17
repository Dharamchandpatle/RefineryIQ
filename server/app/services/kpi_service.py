from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

from app.config import settings


def _resolve_path(file_name: str) -> Path:
    return Path(settings.data_dir) / file_name


def _find_column(df: pd.DataFrame, candidates: list[str]) -> str | None:
    lowered = {col.lower(): col for col in df.columns}
    for name in candidates:
        if name.lower() in lowered:
            return lowered[name.lower()]
    return None


def _safe_float(value) -> float | None:
    try:
        if pd.isna(value):
            return None
        return float(value)
    except Exception:
        return None


def compute_kpi_summary() -> dict:
    file_path = _resolve_path("final_refinery_data_with_anomalies.csv")
    if not file_path.exists():
        return {
            "total_energy": None,
            "avg_energy": None,
            "avg_sec": None,
            "anomaly_rate": None,
            "last_updated": datetime.now(timezone.utc),
        }

    df = pd.read_csv(file_path)
    energy_col = _find_column(
        df,
        ["energy", "energy_consumption", "total_energy", "energy_kwh", "consumption"],
    )
    sec_col = _find_column(df, ["sec", "specific_energy_consumption", "sec_value"])
    anomaly_col = _find_column(df, ["anomaly", "is_anomaly", "anomaly_flag"])

    total_energy = _safe_float(df[energy_col].sum()) if energy_col else None
    avg_energy = _safe_float(df[energy_col].mean()) if energy_col else None
    avg_sec = _safe_float(df[sec_col].mean()) if sec_col else None

    anomaly_rate = None
    if anomaly_col and len(df.index) > 0:
        try:
            anomaly_rate = float(df[anomaly_col].sum()) / float(len(df.index))
        except Exception:
            anomaly_rate = None

    return {
        "total_energy": total_energy,
        "avg_energy": avg_energy,
        "avg_sec": avg_sec,
        "anomaly_rate": anomaly_rate,
        "last_updated": datetime.now(timezone.utc),
    }


async def get_latest_snapshot(db) -> dict:
    if db is None:
        return compute_kpi_summary()

    snapshot = await db.kpi_snapshots.find_one(sort=[("timestamp", -1)])
    if snapshot:
        return {
            "total_energy": snapshot.get("total_energy"),
            "avg_energy": snapshot.get("avg_energy"),
            "avg_sec": snapshot.get("avg_sec"),
            "anomaly_rate": snapshot.get("anomaly_rate"),
            "last_updated": snapshot.get("timestamp") or snapshot.get("last_updated"),
            "id": str(snapshot.get("_id")),
        }

    return compute_kpi_summary()


async def list_snapshots(db, limit: int) -> list[dict]:
    if db is None:
        return []

    cursor = db.kpi_snapshots.find().sort("timestamp", -1).limit(limit)
    snapshots = []
    async for item in cursor:
        snapshots.append(
            {
                "id": str(item.get("_id")),
                "total_energy": item.get("total_energy"),
                "avg_energy": item.get("avg_energy"),
                "avg_sec": item.get("avg_sec"),
                "anomaly_rate": item.get("anomaly_rate"),
                "last_updated": item.get("timestamp") or item.get("last_updated"),
            }
        )
    return snapshots
