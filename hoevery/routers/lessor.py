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
    _dict = {}
    # fake_value
    _dict['create_by'] = "admin"

    with SessionContext() as se:
        try:
            user_id = se.query(db.user).filter(db.user.username == _dict['create_by']).first()
            _owner_id = int(getattr(user_id, 'id'))
        except Exception as e:
            return dict(ret=-1, msg=f"user not found at name {_dict['create_by']}")

        myCar = db.mycar()
        for key in data:
            if hasattr(myCar, key):
                # if(key == 'price' or key == 'function'):
                    # json_string = json.dumps(data.get(key))
                    # print(type(json_string))
                    # setattr(myCar, key, json_string)
                # elif (key == 'user_id'):
                if (key == 'owner_id'):
                    setattr(myCar, key, _owner_id)
                else:
                    setattr(myCar, key, data.get(key))
        se.add(myCar)
        se.commit()
        se.refresh(myCar)
        return dict(ret=0, msg="Complete.", data= f"Successfully, {myCar.carname} inserted by {_dict['create_by']}")

@router.get("", status_code=200, tags=["LESSOR"])
def all(response: Response):
    with SessionContext() as se:
        mycar = se.query(db.mycar)
        total = mycar.count()
        data = mycar.all()
        return dict(ret=0, msg="Complete", data=dict(total=total, row=data))
