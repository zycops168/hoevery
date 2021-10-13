# local
from config import settings

# library
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from sqlalchemy.sql import expression
from sqlalchemy.types import String, Unicode, UnicodeText, Integer, DateTime, Boolean, Float
import sys

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
    rental_=relationship('rentalHistory', back_populates="rental_by")



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
    owner_id = Column(Integer, ForeignKey('USER.id'))

    creator = relationship("user", back_populates="mycar")
    car_ = relationship("rentalHistory", back_populates="car")

class typeOfWork(Base):
    __tablename__ = 'WORK_TYPE'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    machine_type = Column(JSON)
    
class rentalHistory(Base):
    __tablename__ = 'RENTAL_HISTORY'
    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, ForeignKey('CAR_FOR_RENT.id'))
    rental_by_id = Column(Integer, ForeignKey('USER.id'))

    car = relationship("carForRent", back_populates="car_")
    rental_by = relationship("user", back_populates="rental_")
    

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








