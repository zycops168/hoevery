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

@router.get("/get-car-with-type", status_code=200, tags=["TENANT"])
def get_car_with_type(response: Response, workType: str):
    with SessionContext() as se:
        try:
            query = se.query(db.mycar)
            total = query.count()
            if (workType) == 'Canal-Dreading':
                # filter or
                data = query.filter(or_(getattr(db.mycar, 'type') == 'Excavator', getattr(db.mycar, 'type') == 'Dragline-Excavators'))
            elif (workType) == 'Crowded':
                data = query.filter(or_(getattr(db.mycar, 'type') == 'Mini-Excavator', getattr(db.mycar, 'type') == 'Skid-Steer-Excavators'))
            
            if not data:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg=f"{workType} not found")
            
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg=f"{workType} not found")
        
        query_filtered = data.count()
        data = data.all()
        return dict(ret=0, msg="Complete", data=dict(total=total, count=query_filtered, row=data))



@router.get("/get-price", status_code=200, tags=["TENANT"])
def get_price_with_car_selected(response: Response, car_id: int):
    with SessionContext() as se:
        try:
            query = se.query(db.mycar)
            carDetial = query.filter(db.mycar.id == car_id).first()
            if not carDetial:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")
            
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Error")
        

        return dict(ret=0, msg="Complete.", data=carDetial.price)


@router.post("/rental", status_code=200, tags=["TENANT"])
def rental(response: Response, request: schemas.RentalForm):
    data = request.dict()
    with SessionContext() as se:
        newRental = db.rental()
        for key in data:
            if hasattr(newRental, key):
                setattr(newRental, key, data.get(key))

        se.add(newRental)
        se.commit()
        se.refresh(newRental)
        return dict(ret=0, msg="Complete.", data= f"data has been saved successfully.")