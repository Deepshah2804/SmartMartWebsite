from rest_framework import viewsets
from app.models import Customer, GroceryOwner, Product, TiffinService , TiffinOwner , Meal
from .serializers import CustomerSerializer, GroceryOwnerSerializer, ProductSerializer, TiffinServiceSerializer , TiffinOwnerSerializer , MealSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class GroceryOwnerViewSet(viewsets.ModelViewSet):
    queryset = GroceryOwner.objects.all()
    serializer_class = GroceryOwnerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class TiffinServiceViewSet(viewsets.ModelViewSet):
    queryset = TiffinService.objects.all()
    serializer_class = TiffinServiceSerializer

class TiffinOwnerViewSet(viewsets.ModelViewSet):
    queryset = TiffinOwner.objects.all()
    serializer_class = TiffinOwnerSerializer

class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    