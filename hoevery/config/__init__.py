import os
import math
import time
import base64
import urllib.parse
from pydantic import BaseSettings
from starlette.config import Config

# import library
import uvicorn
import fastapi
import starlette
config = Config("./.env")
def STRtoSTRb64(s): return base64.b64encode(s.encode()).strip().decode()


class CommonSettings(BaseSettings):
    APP_NAME: str = config("APP_NAME", default="DEFAULT APP")
    APP_VERSION: str = config("APP_VERSION")
    DEBUG_MODE: bool = config("LOCAL", cast=bool, default=False)
    def SESSION_SID(x=None): return str(hex(int(time.time()*1000))) + str(os.urandom(2).hex())


class ServerSettings(BaseSettings):
    HOST: str = config("HOST")
    PORT: int = config("PORT")


class DatabaseSettings(BaseSettings):
    def _PRASE_URL(x): return urllib.parse.quote(x, safe="")
    DB_SERVICE: str = config("DB_SERVICE")
    DB_SERVER: str = config("DB_SERVER")
    DB_USER: str = config("DB_USER")
    DB_PASS: str = config("DB_PASS")
    DB_NAME: str = config("DB_NAME")
    DB_AUTH: str = config("DB_AUTH")
    DB_PORT: str = config("DB_PORT")
    DB_URL: str = f"{DB_SERVICE}://{DB_USER}:{DB_PASS}@{DB_SERVER}:{DB_PORT}/{DB_NAME}"


class APISecretSettings(BaseSettings):
    API_ALGORITHM: str = config("API_ALGORITHM")
    API_SECRET_KEY: str = STRtoSTRb64("".join([STRtoSTRb64(f"{ord(v)**math.pi}{v}")for i, v in enumerate(config("API_SECRET_KEY"))]))[:-3]
    ASCII_SECRET_KEY: str = config("ASCII_SECRET_KEY")
    API_TOKEN_TYPE: str = config("API_TOKEN_TYPE")
    API_TOKEN_ALIVE: int = config("API_TOKEN_ALIVE")

    config("HOST")
    config("PORT")

class Settings(
    CommonSettings,
    ServerSettings,
    DatabaseSettings,
    APISecretSettings,
):
    pass

settings = Settings()