from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

import google.generativeai as genai

from app.config import settings


def _build_system_prompt(context: dict[str, Any] | None) -> str:
    context = context or {}
    kpis = context.get("kpis") or {}
    alerts = context.get("alerts") or []
    recommendations = context.get("recommendations") or []

    return (
        "You are a refinery operations assistant. Explain KPIs, alerts, forecasts, and "
        "recommendations clearly for engineers and leadership."
        f"\nKPIs: {kpis}"
        f"\nAlerts: {alerts}"
        f"\nRecommendations: {recommendations}"
        "\nKeep responses concise, actionable, and data-driven."
    )


def generate_reply(message: str, context: dict[str, Any] | None) -> tuple[str, str | None]:
    if not settings.gemini_api_key:
        return (
            "Gemini API key is not configured. Set GEMINI_API_KEY in the server .env file.",
            None,
        )

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    system_prompt = _build_system_prompt(context)
    response = model.generate_content([system_prompt, message])
    return response.text, model.model_name


def build_chat_log(message: str, response: str, context: dict[str, Any] | None, user_id: str | None) -> dict:
    return {
        "user_id": user_id,
        "message": message,
        "response": response,
        "context": context,
        "created_at": datetime.now(timezone.utc),
    }
