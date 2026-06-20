from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.summary import SummaryResponse
from utils.auth_utils import get_current_user
from core.database import get_db
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[SummaryResponse])
async def get_history(
    skip: int = 0,
    limit: int = 20,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    cursor = db["summaries"].find({"user_id": current_user["id"]}).sort("created_at", -1).skip(skip).limit(limit)
    summaries = await cursor.to_list(length=limit)
    
    result = []
    for doc in summaries:
        result.append(SummaryResponse(
            id=str(doc["_id"]),
            original_text=doc["original_text"],
            summary=doc["summary"],
            title=doc["title"],
            keywords=doc["keywords"],
            language=doc["language"],
            created_at=doc["created_at"]
        ))
    return result

@router.delete("/{summary_id}")
async def delete_summary(
    summary_id: str,
    current_user=Depends(get_current_user),
    db=Depends(get_db)
):
    try:
        obj_id = ObjectId(summary_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    result = await db["summaries"].delete_one({"_id": obj_id, "user_id": current_user["id"]})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Summary not found")
        
    return {"message": "Summary deleted successfully"}
