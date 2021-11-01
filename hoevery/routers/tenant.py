import uvicorn
from pydantic import BaseModel, validator
from fastapi import FastAPI, Request, Response, HTTPException, status, APIRouter
from config import settings
from config.db import *
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    HTTPBasic,
    HTTPBasicCredentials,
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from sqlalchemy import or_
# importing the library calculate distance
from geopy.geocoders import Nominatim
from geopy import distance
# importing the module
import bisect
import json
import schemas

router = APIRouter()


@router.get("/get-car-with-type", status_code=200, tags=["TENANT"])
def get_car_with_type(response: Response, typeOfWork: str):
    with SessionContext() as se:
        try:
            workList = [
                "JOBTYPETEST",
                "Natural canal dredging",
                "Dig a common holeto make a base",
                "dig a canal",
                "dig a drainage hole",
                "Dig soilSoft soil",
                "Min soilpebblelimestonemineral rock",
                "Move dispose material in a place where space is limited",
            ]

            typeOfWorkDB = (
                se.query(db.typeOfWork).filter(db.typeOfWork.name == typeOfWork).first()
            )
            lenOfJsonData = len(typeOfWorkDB.machine_type)
            # print('typeOfWorkDB: ', typeOfWorkDB.machine_type)
            # print('len of typeOfWorkDB: ', len(typeOfWorkDB.machine_type))
            # print(f"typeOfWorkDB.machine_type['1']: {typeOfWorkDB.machine_type['1']}")

            query = se.query(db.carForRent)
            total = query.count()
            for i in range(len(workList)):
                if (typeOfWorkDB.name) == workList[i]:
                    # filter or
                    if (lenOfJsonData) == 1:
                        data = query.filter(
                            (
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"]
                            )
                        )
                    elif (lenOfJsonData) == 2:
                        data = query.filter(
                            or_(
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["2"],
                            )
                        )
                    elif (lenOfJsonData) == 3:
                        data = query.filter(
                            or_(
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["2"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["3"],
                            )
                        )

            if not data:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg=f"{typeOfWork} not match another machine")

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg=f"Failed, {typeOfWork} not match another machine")

        query_filtered = data.count()
        data = data.all()
        return dict(
            ret=0,
            msg="Complete",
            data=dict(total=total, count=query_filtered, row=data),
        )

def sort_distance(json):
    try:
        return float(json['distance'])
    except KeyError:
        return 0

@router.get("/match-car-nearby", status_code=200, tags=["TENANT"])
def match_car_nearby(response: Response, typeOfWork: str="dig a drainage hole", latitude: float=13.9411105, longitude: float=100.6403282):
    with SessionContext() as se:
        try:
            workList = [
                "JOBTYPETEST",
                "Natural canal dredging",
                "Dig a common holeto make a base",
                "dig a canal",
                "dig a drainage hole",
                "Dig soilSoft soil",
                "Min soilpebblelimestonemineral rock",
                "Move dispose material in a place where space is limited",
            ]

            typeOfWorkDB = (
                se.query(db.typeOfWork).filter(db.typeOfWork.name == typeOfWork).first()
            )
            lenOfJsonData = len(typeOfWorkDB.machine_type)

            query = se.query(db.carForRent)
            total = query.count()
            for i in range(len(workList)):
                if (typeOfWorkDB.name) == workList[i]:
                    # filter or
                    if (lenOfJsonData) == 1:
                        data = query.filter(
                            (
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"]
                            )
                        )
                    elif (lenOfJsonData) == 2:
                        data = query.filter(
                            or_(
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["2"],
                            )
                        )
                    elif (lenOfJsonData) == 3:
                        data = query.filter(
                            or_(
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["1"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["2"],
                                getattr(db.carForRent, "type")
                                == typeOfWorkDB.machine_type["3"],
                            )
                        )

                    query_filtered = data.count()
                    car = data.all()

                    _list = []
                    _list_filterd = []

                    for i in range(len(car)):
                        userLatitude, userLongitude=(latitude), (longitude)
                        carLatitude, carLongitude=(car[i].latitude), (car[i].longitude)

                        if (carLatitude != None or carLongitude != None):
                            place1=(userLatitude,userLongitude)
                            place2=(carLatitude,carLongitude)
                            distance_km = distance.distance(place1, place2).km
                            setattr(car[i], 'distance', float(format(distance_km, '.2f')))
                        else :
                            setattr(car[i], 'distance', -1)
                        
                        
                        _list.append(vars(car[i]))
                        # filter distance less than 10 km
                        if _list[i]['distance'] < 10.0 and _list[i]['distance'] != -1:
                            _list_filterd.append(_list[i])
                    
                    # sort data with distance
                    _list_filterd.sort(key=sort_distance, reverse=False)

                        
            if not data:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg=f"{typeOfWork} not match another machine")

            

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg=f"Failed, {typeOfWork} not match another machine")

        return dict(
            ret=0,
            msg="Complete",
            data=dict(total=total, count=query_filtered, filtered_distance=len(_list_filterd),row=_list_filterd),
        )
        


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
async def get_detail_select_car(response: Response, car_id: int):
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
        return dict(
            ret=0,
            msg="Complete.",
            data=dict(
                provider=username.username,
                carname=carDetial.carname,
                type=carDetial.type,
                size=carDetial.size,
                price=carDetial.price,
                function=carDetial.function,
                image=carDetial.image,
                latitude=carDetial.latitude,
                longitude=carDetial.longitude
            ),
        )


@router.post("/create-order", status_code=200, tags=["TENANT"])
async def create_order(response: Response, request: schemas.RentalForm):
    data = request.dict()
    with SessionContext() as se:
        try:
            newOrder = db.order()
            rental_by_id = (
                se.query(db.user).filter(db.user.username == data["rental_by"]).first()
            )
            dataCar = (
                se.query(db.carForRent).filter(db.carForRent.id == data["car_id"]).first()
            )
            ownerCar = (
                se.query(db.user).filter(db.user.id == dataCar.owner_id).first()
            )
            for key in data:
                if hasattr(newOrder, key):
                    if key == "rental_by":
                        setattr(newOrder, "rental_by_id", rental_by_id.id)
                    else:
                        setattr(newOrder, key, data.get(key))
                        setattr(newOrder, "owner_car", ownerCar.username)

            se.add(newOrder)
            se.commit()
            se.refresh(newOrder)
            return dict(ret=0, msg="Complete.", data=f"data has been saved successfully.")
        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="[Error] not found")


@router.get("/history-order", status_code=200, tags=["TENANT"])
async def history_order(response: Response, username: str):
    with SessionContext() as se:
        try:
            datauser = se.query(db.user).filter(db.user.username == username).first()
            order = se.query(db.order).filter(db.order.rental_by_id == datauser.id).all()
            if not order:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Can't find the car")

        
        return dict(
            ret=0,
            msg="Complete.",
            data=order
        )

@router.post("/payment", status_code=200, tags=["TENANT"])
async def paymant(request: schemas.PaymentForm, response: Response):
    data = request.dict()
    with SessionContext() as se:
        try:
            order_id = se.query(db.order).filter(db.order.id == data['order_id']).first().id
            rental_by_username = (
                se.query(db.user).filter(db.user.id == data["rental_by_id"]).first()
            ).username
            if not order_id:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Order not found")
                
            newPayment = db.payment()
            for key in data:
                if hasattr(newPayment, key):
                    setattr(newPayment, key, data.get(key))
                elif key == "rental_by_id":
                    setattr(newPayment, "rental_by", rental_by_username)
            
            se.add(newPayment)
            se.commit()
            se.refresh(newPayment)
            
            return dict(ret=0, msg="Complete.", data=f"data has been saved successfully.")

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Order not found")

    
@router.get("/payment", status_code=200, tags=["TENANT"])
async def history_order(response: Response, username: str):
    with SessionContext() as se:
        try:
            datauser = se.query(db.user).filter(db.user.username == username).first()
            order = se.query(db.order).filter(db.order.rental_by_id == datauser.id).all()
            if not order:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Can't find the car")

        
        return dict(
            ret=0,
            msg="Complete.",
            data=order
        )