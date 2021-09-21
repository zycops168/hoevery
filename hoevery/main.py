import uvicorn
from fastapi import FastAPI, Depends
from config import settings
from config.db import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TEST APIs",
    description="Test api docs.",
    version="0.1.1"
    )

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501"         
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["*"],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#IMPORT login_router
from routers.user import router as user_router
#INCLUDE to app
app.include_router(
    user_router, 
    prefix="/user",
    tags=["USER"]
)

from routers.lessor import router as lessor_router
#INCLUDE to app
app.include_router(
    lessor_router, 
    prefix="/lessor",
    tags=["LESSOR"]
)

from routers.tenant import router as tenant_router
#INCLUDE to app
app.include_router(
    tenant_router, 
    prefix="/tenant",
    tags=["TENANT"]
)

# from routers.blog import router as blog_router
# #INCLUDE to app
# app.include_router(
#     blog_router, 
#     prefix="/blog",
#     tags=["BLOGS"]
# )

from routers.service import router as service_router
#INCLUDE to app
app.include_router(
    service_router, 
    prefix="/service",
    tags=["SERVICE"]
)

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)