from django.db import models

class Customer(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username

class GroceryOwner(models.Model):

    username = models.CharField(max_length=150, unique=True, null=True)
    email = models.EmailField(unique=True, null=True)
    password = models.CharField(max_length=128, null=True)
    shop_name = models.CharField(max_length=255)

    def __str__(self):
        return self.shop_name

class Product(models.Model):
    shop = models.ForeignKey(GroceryOwner, null=True, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available_quantity = models.PositiveIntegerField()
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class TiffinOwner(models.Model):

    username = models.CharField(max_length=150, unique=True, null=True)
    email = models.EmailField(unique=True, null=True)
    password = models.CharField(max_length=128, null=True)
    tiffin_service_name = models.CharField(max_length=255)

    def __str__(self):
        return self.tiffin_service_name
    

class Meal(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.JSONField()  # Storing ingredients as a JSON array
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class TiffinService(models.Model):
    tiffin_owner = models.ForeignKey(TiffinOwner, null=True, related_name='tiffin_services', on_delete=models.CASCADE)
    menu_name = models.CharField(max_length=100)
    description = models.TextField()
    meals = models.ManyToManyField(Meal, related_name='tiffin_services')

    def __str__(self):
        return self.menu_name
