from sqlalchemy import  Column, Integer, String
from config.db import Base

class user(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    tel = Column(String)