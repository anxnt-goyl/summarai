from fastapi import APIRouter, Depends, HTTPException
from models.summary import SummaryRequest, SummaryResponse
from utils.auth_utils import get_current_user
from services.summarizer import process_text
from core.database import get_db
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=SummaryResponse)
async def create_summary(
    request: SummaryRequest,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
        
    # Process text using summarization service
    result = await process_text(request.text)
    
    summary_doc = {
        "user_id": current_user["id"],
        "original_text": request.text,
        "summary": result["summary"],
        "title": result["title"],
        "keywords": result["keywords"],
        "language": result["language"],
        "created_at": datetime.utcnow()
    }
    
    db_result = await db["summaries"].insert_one(summary_doc)
    
    return SummaryResponse(
        id=str(db_result.inserted_id),
        original_text=summary_doc["original_text"],
        summary=summary_doc["summary"],
        title=summary_doc["title"],
        keywords=summary_doc["keywords"],
        language=summary_doc["language"],
        created_at=summary_doc["created_at"]
    )
