from django.contrib import admin
from .models import Customer , GroceryOwner , Product , TiffinService , TiffinOwner , Meal

admin.site.register(Customer)
admin.site.register(GroceryOwner)
admin.site.register(Product)
admin.site.register(TiffinService)
admin.site.register(TiffinOwner)
admin.site.register(Meal)
