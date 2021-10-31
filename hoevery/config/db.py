# local
from config import settings

# library
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from sqlalchemy.sql import expression
from sqlalchemy.types import String, Unicode, UnicodeText, Integer, DateTime, Boolean, Float
import sys
import datetime
import pytz

db = sys.modules[__name__]

engine = create_engine(settings.DB_URL, pool_recycle=3600, pool_size=50)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class SessionContext:
    def __init__(self):
        self.se = SessionLocal()

    def __enter__(self):
        return self.se

    def __exit__(self, exc_type, exc_value, traceback):
        self.se.close()



# class Blog(Base):
#     __tablename__ = 'blogs'

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     body = Column(String)
#     user_id = Column(Integer, ForeignKey('user.id'))

#     creator = relationship("user", back_populates="blogs")

class user(Base):
    __tablename__ = 'USER'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    tel = Column(String)
    image = Column(String)
    
    mycar=relationship('carForRent', back_populates="creator")
    rental_=relationship('order', back_populates="rental_by")



class carForRent(Base):
    __tablename__ = 'CAR_FOR_RENT'
    id = Column(Integer, primary_key=True, index=True)
    carname = Column(String)
    type = Column(String)
    size = Column(String)
    price = Column(JSON)
    function = Column(String)
    image = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    created_date = Column(DateTime, default=datetime.datetime.now(tz=pytz.timezone("Asia/Bangkok")))
    owner_id = Column(Integer, ForeignKey('USER.id'))
    
    creator = relationship("user", back_populates="mycar")
    car_ = relationship("order", back_populates="car")

class typeOfWork(Base):
    __tablename__ = 'WORK_TYPE'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    machine_type = Column(JSON)
    
class order(Base):
    __tablename__ = 'ORDER'
    id = Column(Integer, primary_key=True, index=True)
    status = Column(String)
    owner_car = Column(String)
    created_date = Column(DateTime, default=datetime.datetime.now(tz=pytz.timezone("Asia/Bangkok")))
    price = Column(Float)
    price_type = Column(String)
    car_id = Column(Integer, ForeignKey('CAR_FOR_RENT.id'))
    rental_by_id = Column(Integer, ForeignKey('USER.id'))

    car = relationship("carForRent", back_populates="car_")
    rental_by = relationship("user", back_populates="rental_")
    order_no = relationship("payment", back_populates="order")

class payment(Base):
    __tablename__ = 'PAYMENT'
    id = Column(Integer, primary_key=True, index=True)
    rental_by = Column(String)
    car_id = Column(Integer)
    price = Column(Integer)
    rental_agreement = Column(String)
    address = Column(String)
    address_detail = Column(String)
    created_date = Column(DateTime, default=datetime.datetime.now(tz=pytz.timezone("Asia/Bangkok")))
    order_id = Column(Integer, ForeignKey('ORDER.id'))
    
    order = relationship("order", back_populates="order_no")

# class Blog(Base):
#     __tablename__ = 'blogs'

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     body = Column(String)
#     user_id = Column(Integer, ForeignKey('users.id'))

#     creator = relationship("User", back_populates="blogs")


# class User(Base):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     email = Column(String)
#     password = Column(String)

#     blogs = relationship('Blog', back_populates="creator")




# create all table 
Base.metadata.create_all(engine)








