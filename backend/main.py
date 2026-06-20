from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, summarize, history

app = FastAPI(title="SummarAI API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(summarize.router, prefix="/api/summarize", tags=["summarize"])
app.include_router(history.router, prefix="/api/history", tags=["history"])

@app.get("/")
async def root():
    return {"message": "Welcome to SummarAI API"}
