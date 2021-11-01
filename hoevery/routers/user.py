import uvicorn
from pydantic import BaseModel, validator
from fastapi import FastAPI, Request, Response, HTTPException, status, APIRouter
from config import settings
from config.db import *
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from passlib.hash import pbkdf2_sha256
from sqlalchemy import or_

from jose import JWTError, jwt
import schemas
import json

router = APIRouter()

def authenticate_user(user_db, username: str, password: str):
    try:
        if not user_db:
            return False
        if not pbkdf2_sha256.verify(password, user_db.password):
            return False
        return user_db
    except Exception as e:
        print('error: ', e)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.API_SECRET_KEY, algorithm=settings.API_ALGORITHM)
    return encoded_jwt


@router.get("/all", tags=["USER"])
async def get_user_all():
    with SessionContext() as se:
        user = se.query(db.user).all()
        print(type(user))
        return user

#@router.get("/{id}", tags=["USER"], status_code=200)
async def get_user_by_id(id, response: Response):    
    with SessionContext() as se:
        user = se.query(db.user).filter(db.user.id == id).first()
        if not user:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Incorrect Username or Password")
        return dict(ret=0, msg="Complete.", data=user)
        
@router.get("/info/{username}", tags=["USER"], status_code=200)
async def get_user_by_username(username:str, response: Response):    
    with SessionContext() as se:
        user = se.query(db.user).filter(db.user.username == username).first()
        if not user:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Incorrect Username or Password")
        return dict(ret=0, msg="Complete.", data=dict(firstname=user.firstname, lastname=user.lastname, tel=user.tel, image=user.image))


@router.post("/login", tags=["USER"], status_code=200)
async def login_for_access_token(request: schemas.LoginForm, response: Response):
    with SessionContext() as se:
        user_db = se.query(db.user).filter(db.user.username == request.username).first()
        if not user_db :
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Incorrect Username or Password")
        
        user = authenticate_user(user_db, request.username, request.password)
        if not user:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Incorrect Username or Password")
            
        access_token_expires = timedelta(minutes=settings.API_TOKEN_ALIVE)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return dict(ret=0, msg="Complete", data=dict(access_token = access_token, token_type = settings.API_TOKEN_TYPE))

@router.post("/register", tags=["USER"], status_code=200)
async def create(request: schemas.RegisterForm, response: Response):
    data = request.dict()
    with SessionContext() as se:
        alreadyUser = se.query(db.user).filter(db.user.username == data['username']).first()
        if alreadyUser:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Username already exits.")

        newUser = db.user()
        for key in data:
            if hasattr(newUser, key):  
                if(key == 'password'):
                    hashed_password = pbkdf2_sha256.hash(data.get(key))
                    setattr(newUser, key, hashed_password)
                else:
                    setattr(newUser, key, data.get(key))
        se.add(newUser)
        se.commit()
        se.refresh(newUser)
        return dict(ret=0, msg="Complete.", data= f"Hello {request.username}, Welcome  to HOEVERY")


@router.get("/{car_id}", tags=["USER"], status_code=200)
async def find_owner_car(car_id:int, response: Response):    
    with SessionContext() as se:
        owner_id = se.query(db.carForRent).filter(db.carForRent.id == car_id).first().owner_id
        owner_tel = se.query(db.user).filter(db.user.id == owner_id).first().tel
        if not owner_tel:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Incorrect Username or Password")
        return dict(ret=0, msg="Complete.", data=owner_tel)