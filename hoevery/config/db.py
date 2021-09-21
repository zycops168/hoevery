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
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    tel = Column(String)
    image = Column(String)
    
    mycar=relationship('mycar', back_populates="creator")
    rental_=relationship('rental', back_populates="rental_by")



class mycar(Base):
    __tablename__ = 'mycar'
    id = Column(Integer, primary_key=True, index=True)
    carname = Column(String)
    type = Column(String)
    size = Column(String)
    price = Column(JSON)
    function = Column(JSON)
    image = Column(String)
    owner_id = Column(Integer, ForeignKey('user.id'))

    creator = relationship("user", back_populates="mycar")
    car_ = relationship("rental", back_populates="car")

class jobtype(Base):
    __tablename__ = 'jobtype'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    
class rental(Base):
    __tablename__ = 'rental'
    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, ForeignKey('mycar.id'))
    rental_by_id = Column(Integer, ForeignKey('user.id'))

    car = relationship("mycar", back_populates="car_")
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








