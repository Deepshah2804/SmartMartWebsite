from rest_framework.routers import DefaultRouter
from app.api.urls import app_router
from django.urls import path,include

router = DefaultRouter()

#Posts
router.registry.extend(app_router.registry)
#Comments
#Texts

urlpatterns =[
    path('',include(router.urls))
]