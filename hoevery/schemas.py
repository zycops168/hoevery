from pydantic import BaseModel
from typing import Optional, List

class RegisterForm(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
    tel: str
    image: str
    class Config:
        title = "[USER] Insert"
        schema_extra = dict(
            example=dict(
                username="admin",
                password="1234",
                firstname="firstname",
                lastname="lastname",
                tel="0912345678",
                image= ""
            )
        )

class LoginForm(BaseModel):
    username: str = None
    password: str = None

    class Config:
        title = "[USER] Login"
        schema_extra = dict(
            example=dict(
                username="admin",
                password="1234"
            )
        )

class AddCarForm(BaseModel):
    id: str = None
    carname: str = None
    type: str = None
    size: str = None
    price: dict = None
    function: Optional[dict] = None
    image: dict = None
    owner_id: int = None

    class Config:
        title = "[LESSOR] Insert"
        schema_extra = dict(
            example=dict(
                carname = "Excavator",
                type = "Excavator",
                size = "PC-30",
                price = {'Daily':'$278.00', 'Weekly': ' $874.00', 'Monthly':'1,858.00'},
                function = {'*OPERATING WEIGHT':'8,340LBS','MAXIMUM CUTTING HEIGHT': '16.3 FT', 'MAXIMUM DUMPING HEIGHT': '11.9FT', 'MAXIMUM DIGGING DEPTH': '11.4FT','MAXIMUM DIGGING REACH': '18.1FT','MINIMUM FRONT SWING RADIUS': '7.2FT','TRANSPORT LENGTH': '15.7FT', 'UPPER STRUCTURE WIDTH': '5.1FT', 'CANOPY': '8.2FT','CAB': '8.2FT'}
            )
        )


class MyCarForm(BaseModel):
    id: str = None
    carname: str = None
    type: str = None
    size: str = None
    price: str = None
    function: str = None

    class Config:
        title = "[TENANT] Login"
        schema_extra = dict(
            example=dict(
                
            )
        )

class JobTypeForm(BaseModel):
    name: str = None

    class Config:
        title = "[SERVICE] Insert"
        schema_extra = dict(
            example=dict(
                name="JobType",
            )
        )

class RentalForm(BaseModel):
    car_id: int
    rental_by_id: int
    
    class Config:
        title = "[TENANT] Insert"
        schema_extra = dict(
            example=dict(
                car_id=1,
                rental_by_id=1,
            )
        )


## demo 
class User(BaseModel):
    name:str
    email:str
    password:str
    class Config:
        title = "[USER] Login"
        schema_extra = dict(
            example=dict(
                name="test",
                email="test@gmail.com",
                password="1234"
            )
        )

class BlogBase(BaseModel):
    title: str
    body: str

class Blog(BlogBase):
    class Config():
        orm_mode = True

class ShowUser(BaseModel):
    name:str
    email:str
    blogs : List[Blog] =[]
    class Config():
        orm_mode = True

class ShowBlog(BaseModel):
    title: str
    body:str
    creator: ShowUser

    class Config():
        orm_mode = True


class Login(BaseModel):
    username: str
    password:str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None




