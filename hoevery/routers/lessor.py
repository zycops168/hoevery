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


@router.post("/insert-car", tags=["LESSOR"], status_code=200)
async def insert(request: schemas.AddCarForm, response: Response):
    data = request.dict()
    # fake_value
    # _dict = {}
    # _dict['create_by'] = "admin"

    with SessionContext() as se:
        try:
            user_id = se.query(db.user).filter(db.user.username == data['create_by']).first()
            _owner_id = int(getattr(user_id, 'id'))
        except Exception as e:
            return dict(ret=-1, msg=f"user not found at name {data['create_by']}")

        carForRent = db.carForRent()
        for key in data:
            if hasattr(carForRent, key):
                # if(key == 'price' or key == 'function'):
                    # json_string = json.dumps(data.get(key))
                    # print(type(json_string))
                    # setattr(myCar, key, json_string)
                # elif (key == 'user_id'):
                if (key == 'owner_id'):
                    setattr(carForRent, key, _owner_id)
                else:
                    setattr(carForRent, key, data.get(key))
        se.add(carForRent)
        se.commit()
        se.refresh(carForRent)
        return dict(ret=0, msg="Complete.", data= f"Successfully, {carForRent.carname} inserted by {data['create_by']}")

@router.get("/my-product", status_code=200, tags=["LESSOR"])
def my_product(response: Response, username:str):
    with SessionContext() as se:
        try:
            carForRent = se.query(db.carForRent)
            total = carForRent.count()
            user_id = se.query(db.user).filter(db.user.username == username).first()
            print("user_id", user_id.id)
            carForRent = carForRent.filter(db.carForRent.owner_id == user_id.id)
        except Exception as e:
            return dict(ret=-1, msg=f"{username} not yet registered to rent a car")
        data = carForRent.all()
        query_filtered = carForRent.count()
        return dict(ret=0, msg="Complete", data=dict(total=total, count=query_filtered, row=data))

@router.get("/all", status_code=200, tags=["LESSOR"])
def all(response: Response):
    with SessionContext() as se:
        carForRent = se.query(db.carForRent)
        total = carForRent.count()
        data = carForRent.all()
        return dict(ret=0, msg="Complete", data=dict(total=total, row=data))
