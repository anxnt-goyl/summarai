from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SummaryRequest(BaseModel):
    text: str

class SummaryResponse(BaseModel):
    id: Optional[str] = None
    original_text: str
    summary: str
    title: str
    keywords: List[str]
    language: str
    created_at: datetime
