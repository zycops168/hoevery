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
                image="",
            )
        )


class LoginForm(BaseModel):
    username: str = None
    password: str = None

    class Config:
        title = "[USER] Login"
        # schema_extra = dict(example=dict(username="admin", password="1234"))


class AddCarForm(BaseModel):
    id: str = None
    create_by: str = None
    carname: str = None
    type: str = None
    size: str = None
    price: dict = None
    function: Optional[str] = None
    image: dict = None
    owner_id: int = None

    class Config:
        title = "[LESSOR] Insert"
        schema_extra = dict(
            example=dict(
                carname="Excavator",
                create_by="admin",
                type="Excavator",
                size="PC-30",
                price={"Daily": "$278.00", "Weekly": " $874.00", "Monthly": "1,858.00"},
                function='{"*OPERATING WEIGHT": "8,340LBS", "MAXIMUM CUTTING HEIGHT": "16.3 FT", "MAXIMUM DUMPING HEIGHT": "11.9FT", "MAXIMUM DIGGING DEPTH": "11.4FT", "MAXIMUM DIGGING REACH": "18.1FT", "MINIMUM FRONT SWING RADIUS": "7.2FT","TRANSPORT LENGTH": "15.7FT", "UPPER STRUCTURE WIDTH": "5.1FT", "CANOPY": "8.2FT", "CAB": "8.2FT",}',
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
        schema_extra = dict(example=dict())


class WorkOfTypeForm(BaseModel):
    name: str = None
    machine_type: dict = None

    class Config:
        title = "[SERVICE] Insert"
        schema_extra = dict(
            example=dict(
                name="JOBTYPETEST",
                machine_type={
                    "1": "Excavator-Test",
                    "2": "Mini-Excavator-Test",
                    "3": "Skid-Steer-Excavators-Test",
                },
            )
        )


class RentalForm(BaseModel):
    car_id: int
    rental_by: str
    status: str
    price: str
    price_type: str

    class Config:
        title = "[TENANT] Insert"
        schema_extra = dict(
            example=dict(
                car_id=1,
                rental_by="admin",
                status="waiting",
                price= "123",
                price_type="Daily"
            )
        )


class InsertImageCarForm(BaseModel):
    id: int
    username: str

    class Config:
        title = "[FILE] Insert Image Car"
        schema_extra = dict(example=dict(id="1", username="admin"))


class PaymentForm(BaseModel):
    rental_by_id : int
    car_id : int
    price : str
    rental_agreement : str
    address : str
    address_detail : str
    order_id : int

    class Config:
        title = "[TENANT] payment"
        schema_extra = dict(example=dict(
            rental_by_id = 1,
            car_id = 1,
            price = "123",
            rental_agreement = 'Daily',
            address = "bkk",
            address_detail = 'abc village',
            order_id = 1)
        )



## demo
class User(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        title = "[USER] Login"
        schema_extra = dict(
            example=dict(name="test", email="test@gmail.com", password="1234")
        )


class BlogBase(BaseModel):
    title: str
    body: str


class Blog(BlogBase):
    class Config:
        orm_mode = True


class ShowUser(BaseModel):
    name: str
    email: str
    blogs: List[Blog] = []

    class Config:
        orm_mode = True


class ShowBlog(BaseModel):
    title: str
    body: str
    creator: ShowUser

    class Config:
        orm_mode = True


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
