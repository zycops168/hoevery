import uvicorn
from pydantic import BaseModel, validator
from fastapi import FastAPI, Request, Response, HTTPException, status, APIRouter
from config import settings
from config.db import *
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import or_

import schemas

router = APIRouter()



@router.post("", status_code=status.HTTP_201_CREATED, tags=['BLOGS'])
def create(request: schemas.Blog):
    with SessionContext() as se:
        new_blog = db.Blog(title=request.title, body=request.body, user_id=1)
        se.add(new_blog)
        se.commit()
        se.refresh(new_blog)
        return new_blog


@router.get("", tags=["BLOGS"])
def all():
    with SessionContext() as se:
        blogs= se.query(db.Blog).all()
        return blogs


@router.get('/{id}', status_code=200, response_model=schemas.ShowBlog, tags=["BLOGS"])
def show(id, response: Response):
    with SessionContext() as se:
        blog = se.query(db.Blog).filter(db.Blog.id == id).first()
        if not blog:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail=f"BLog with the id {id} is not available")

        return blog


@router.post('', tags=["BLOGS"])
def create_user(request: schemas.User, response: Response):
    data = request.dict()

    with SessionContext() as se:

        alreadyUser = se.query(db.User).filter(db.User.email == data['email']).first()
        if alreadyUser:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="email already exits.", data=alreadyUser)

        newUser = db.User()
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
        return dict(ret=0, msg="Complete.", data=newUser)

@router.post('/{id}', response_model=schemas.ShowUser, tags=["BLOGS"])
def get_user(id:int):
    with SessionContext() as se:
        user = se.query(db.User).filter(db.User.id == id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"User with the id {id} is not available")
        return dict(user)
