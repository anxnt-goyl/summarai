from fastapi import APIRouter, Depends, HTTPException, status
from models.user import UserCreate, UserLogin, UserResponse, Token
from core.database import get_db
from core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate, db=Depends(get_db)):
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.model_dump()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    
    result = await db["users"].insert_one(user_dict)
    created_user = await db["users"].find_one({"_id": result.inserted_id})
    
    return UserResponse(
        id=str(created_user["_id"]),
        username=created_user["username"],
        email=created_user["email"]
    )

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db=Depends(get_db)):
    user = await db["users"].find_one({"email": user_credentials.email})
    if not user or not verify_password(user_credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}
