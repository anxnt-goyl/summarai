import random
import asyncio

async def process_text(text: str):
    """
    Mock summarization service.
    In a real application, this would call an AI API like OpenAI, Gemini, or a local NLP model.
    """
    # Simulate processing delay
    await asyncio.sleep(1)
    
    # Mock Language Detection
    language = "English" if "the" in text.lower() else "Unknown"
    
    # Mock Summarization
    words = text.split()
    summary_length = max(10, len(words) // 3)
    summary = " ".join(words[:summary_length]) + "..." if words else ""
    
    # Mock Title Generation
    title = " ".join(words[:3]).capitalize() + " Summary" if words else "Empty Summary"
    
    # Mock Keywords Generation
    keywords = list(set([w.lower() for w in words if len(w) > 4]))[:5]
    if not keywords:
        keywords = ["AI", "Summary", "Text"]
        
    return {
        "summary": summary,
        "title": title,
        "keywords": keywords,
        "language": language
    }
