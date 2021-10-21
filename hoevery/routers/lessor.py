import uvicorn
from pydantic import BaseModel, validator
from fastapi import (
    FastAPI,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
    File,
    UploadFile,
    Form,
)
from config import settings
from config.db import *
from typing import Optional, List, Dict
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    HTTPBasic,
    HTTPBasicCredentials,
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from sqlalchemy import or_

import schemas

router = APIRouter()


# @router.post("/insert-car", tags=["LESSOR"], status_code=200)
async def insert(request: schemas.AddCarForm, response: Response):
    data = request.dict()
    # fake_value
    # _dict = {}
    # _dict['create_by'] = "admin"

    with SessionContext() as se:
        try:
            user_id = (
                se.query(db.user).filter(db.user.username == data["create_by"]).first()
            )
            _owner_id = int(getattr(user_id, "id"))
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
                if key == "owner_id":
                    setattr(carForRent, key, _owner_id)
                else:
                    setattr(carForRent, key, data.get(key))
        se.add(carForRent)
        se.commit()
        se.refresh(carForRent)
        return dict(
            ret=0,
            msg="Complete.",
            data=f"Successfully, {carForRent.carname} inserted by {data['create_by']}",
        )


class ThingDescription(BaseModel):
    Daily: str = "124"
    Weekly: str = "345"
    Monthly: str = "656"


@router.post("/insert-car", tags=["LESSOR"], status_code=200)
async def insert(
    # request: schemas.AddCarForm,
    response: Response,
    carname: str = Form(...),
    type: str = Form(...),
    size: str = Form(...),
    Daily: str = Form(...),
    Weekly: str = Form(...),
    Monthly: str = Form(...),
    function: Optional[str] = Form(...),
    create_by: str = Form(...),
    uploaded_file: UploadFile = File(...),
):
    # data = request.dict()
    with SessionContext() as se:

        try:
            file_location = f"static/files/upload/{create_by}_{carname}_profilecar"
            with open(file_location, "wb+") as file_object:
                file_object.write(uploaded_file.file.read())

            user_id = se.query(db.user).filter(db.user.username == create_by).first()
            price = {"Daily": Daily, "Weekly": Weekly, "Monthly": Monthly}
            _owner_id = int(getattr(user_id, "id"))
        except Exception as e:
            return dict(ret=-1, msg=f"user not found at name {create_by}")

        carForRent = db.carForRent(
            carname=carname,
            type=type,
            size=size,
            price=price,
            function=function,
            image=f"{create_by}_{carname}_profilecar",
            owner_id=_owner_id,
        )

        se.add(carForRent)
        se.commit()
        se.refresh(carForRent)
        return dict(
            ret=0,
            msg="Complete.",
            data=f"Successfully, {carForRent.carname} inserted by {create_by}",
        )


@router.get("/my-product", status_code=200, tags=["LESSOR"])
async def my_product(response: Response, username: str):
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
        return dict(
            ret=0,
            msg="Complete",
            data=dict(total=total, count=query_filtered, row=data),
        )


@router.get("/all", status_code=200, tags=["LESSOR"])
async def all(response: Response):
    with SessionContext() as se:
        carForRent = se.query(db.carForRent)
        total = carForRent.count()
        data = carForRent.all()
        return dict(ret=0, msg="Complete", data=dict(total=total, row=data))


@router.get("/order", status_code=200, tags=["LESSOR"])
async def order(response: Response, username: str):
    with SessionContext() as se:
        try:
            datauser = se.query(db.user).filter(db.user.username == username).first()
            order = se.query(db.order).filter(db.order.owner_car == datauser.username)
            orderWaiting = se.query(db.order).filter(db.order.status == "waiting")
            if not order:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Can't find the car")

        except Exception as e:
            response.status_code = status.HTTP_404_NOT_FOUND
            return dict(ret=-1, msg="Can't find the car")

        data = order.all()
        query_filtered = order.count()
        orderWaiting_filtered = orderWaiting.count()
        return dict(
            ret=0,
            msg="Complete.",
            data=dict(count=query_filtered, waiting=orderWaiting_filtered, row=data),
        )


@router.put("/update-status-order")
async def update_status_order(order_id: int, status: str, response: Response):
    with SessionContext() as se:
        try:
            order = se.query(db.order).filter(db.order.id == order_id).first()
            if not order:
                response.status_code = status.HTTP_404_NOT_FOUND
                return dict(ret=-1, msg="Order not found")

            if hasattr(order, "id"):
                setattr(order, "id", order_id)
            if hasattr(order, "status"):
                setattr(order, "status", status)

            se.commit()
            se.refresh(order)

            return dict(ret=0, msg="Complete.", data={"data has been updated "})

        except Exception as e:
            return dict(ret=-1, msg=f"Error")


@router.delete("/delete-car")
async def delete_user(car_id: int):
    with SessionContext() as se:
        try:
            deleteCar_id = (
                se.query(db.carForRent).filter(db.carForRent.id == car_id).first()
            )
            if deleteCar_id:
                tmp = deleteCar_id.id
                se.delete(deleteCar_id)
                se.commit()
                return dict(ret=0, msg="data has deleted.", data=dict(deleted_id=tmp))
            else:
                return "not found"
        except Exception as e:
            return -1
