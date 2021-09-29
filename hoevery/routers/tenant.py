import uvicorn
from pydantic import BaseModel, validator
from fastapi import FastAPI, Request, Response, HTTPException, status, APIRouter
from config import settings
from config.db import *
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import or_
import json
import schemas

router = APIRouter()

@router.get("/get-car-with-type", status_code=200, tags=["TENANT"])
def get_car_with_type(response: Response, typeOfWork: str):
    with SessionContext() as se:
        try:
            workList = ["JOBTYPETEST", "Natural canal dredging", "Dig a common holeto make a base", "dig a canal", "dig a drainage hole", "Dig soilSoft soil", "Min soilpebblelimestonemineral rock"]

            typeOfWorkDB = se.query(db.typeOfWork).filter(db.typeOfWork.name == typeOfWork).first()
            lenOfJsonData = len(typeOfWorkDB.machine_type)
            # print('typeOfWorkDB: ', typeOfWorkDB.machine_type)
            # print('len of typeOfWorkDB: ', len(typeOfWorkDB.machine_type))
            # print(f"typeOfWorkDB.machine_type['1']: {typeOfWorkDB.machine_type['1']}")
            
            query = se.query(db.carForRent)
            total = query.count()
            for i in range(len(workList)):
                if (typeOfWorkDB.name) == workList[i]:
                    # filter or
                    if (lenOfJsonData) == 1 :
                        data = query.filter((getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['1']))
                    elif (lenOfJsonData) == 2 :
                        data = query.filter(or_(getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['1'], getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['2']))
                    elif (lenOfJsonData) == 3 :
                        data = query.filter(or_(getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['1'], getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['2'],getattr(db.carForRent, 'type') == typeOfWorkDB.machine_type['3']))
            
            if not data:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg=f"{typeOfWork} not match another machine")
            
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg=f"Failed, {typeOfWork} not match another machine")
        
        query_filtered = data.count()
        data = data.all()
        return dict(ret=0, msg="Complete", data=dict(total=total, count=query_filtered, row=data))



@router.get("/get-price", status_code=200, tags=["TENANT"])
def get_price_with_car_selected(response: Response, car_id: int):
    with SessionContext() as se:
        try:
            query = se.query(db.carForRent)
            carDetial = query.filter(db.carForRent.id == car_id).first()
            if not carDetial:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")
            
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Error")
        

        return dict(ret=0, msg="Complete.", data=carDetial.price)

@router.get("/get-detail", status_code=200, tags=["TENANT"])
def get_detail_select_car(response: Response, car_id: int):
    with SessionContext() as se:
        try:
            query = se.query(db.carForRent)
            carDetial = query.filter(db.carForRent.id == car_id).first()
            if not carDetial:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")
            
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Error")
        
        username = se.query(db.user).filter(db.user.id == carDetial.owner_id).first()
        return dict(ret=0, msg="Complete.", data=dict(provider=username.username, 
            carname=carDetial.carname, type=carDetial.type, size=carDetial.size, price=carDetial.price, function=carDetial.function, image=carDetial.image))


@router.post("/rental", status_code=200, tags=["TENANT"])
def rental(response: Response, request: schemas.RentalForm):
    data = request.dict()
    with SessionContext() as se:
        newRental = db.rentalHistory()
        rental_by_id = se.query(db.user).filter(db.user.username == data['rental_by']).first()
        print(rental_by_id.id)
        for key in data:
            if hasattr(newRental, key): 
                print("key", key)
                if(key == 'rental_by'):
                    setattr(newRental, 'rental_by_id', rental_by_id.id)
                else:
                    setattr(newRental, key, data.get(key))

        se.add(newRental)
        se.commit()
        se.refresh(newRental)
        return dict(ret=0, msg="Complete.", data= f"data has been saved successfully.")