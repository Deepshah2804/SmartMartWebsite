from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, GroceryOwnerViewSet, ProductViewSet, TiffinServiceViewSet , TiffinOwnerViewSet , MealViewSet

app_router = DefaultRouter()
app_router.register(r'customers', CustomerViewSet)
app_router.register(r'groceryowners', GroceryOwnerViewSet)
app_router.register(r'products', ProductViewSet)
app_router.register(r'tiffinowners', TiffinOwnerViewSet)
app_router.register(r'tiffin-services', TiffinServiceViewSet)
app_router.register(r'meals', MealViewSet)

