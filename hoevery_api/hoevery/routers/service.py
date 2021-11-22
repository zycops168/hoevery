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


@router.post("/insert-job-type", tags=["SERVICE"], status_code=200)
async def insert_job_type(request: schemas.WorkOfTypeForm, response: Response):
    data = request.dict()
    with SessionContext() as se:
        alreadyTypeOfWork = se.query(db.typeOfWork).filter(db.typeOfWork.name == data['name']).first()
        if alreadyTypeOfWork:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg=f"{data['name']} already exits.")

        newTypeOfWork = db.typeOfWork()
        for key in data:
            if hasattr(newTypeOfWork, key):
                    setattr(newTypeOfWork, key, data.get(key))
        se.add(newTypeOfWork)
        se.commit()
        se.refresh(newTypeOfWork)
        return dict(ret=0, msg="Complete.", data= f"{newTypeOfWork.name} has been saved successfully.")

# @router.get("", status_code=200, tags=["SERVICE"])
# def all(response: Response):
#     with SessionContext() as se:
#         mycar = se.query(db.mycar)
#         total = mycar.count()
#         data = mycar.all()
#         return dict(ret=0, msg="Complete", data=dict(total=total, row=data))
