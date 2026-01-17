from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends

from app.db.mongodb import get_db
from app.models.schemas import ChatbotRequest, ChatbotResponse
from app.services.chatbot_service import build_chat_log, generate_reply

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


@router.post("", response_model=ChatbotResponse)
async def chatbot(request: ChatbotRequest, db=Depends(get_db)) -> ChatbotResponse:
    reply, model_name = generate_reply(request.message, request.context)
    created_at = datetime.now(timezone.utc)

    if db is not None:
        await db.chatbot_logs.insert_one(
            build_chat_log(request.message, reply, request.context, request.user_id)
        )

    return ChatbotResponse(reply=reply, created_at=created_at, model=model_name)
