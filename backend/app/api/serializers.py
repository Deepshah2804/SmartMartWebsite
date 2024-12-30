from rest_framework import serializers
from app.models import Customer, GroceryOwner, Product, TiffinService , TiffinOwner , Meal

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class GroceryOwnerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = GroceryOwner
        fields = '__all__'

class TiffinServiceSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True)

    class Meta:
        model = TiffinService
        fields = '__all__'

    def create(self, validated_data):
        meals_data = validated_data.pop('meals')
        tiffin_service = TiffinService.objects.create(**validated_data)
        for meal_data in meals_data:
            meal = Meal.objects.create(**meal_data)
            tiffin_service.meals.add(meal)
        return tiffin_service

    def update(self, instance, validated_data):
        meals_data = validated_data.pop('meals')
        instance.menu_name = validated_data.get('menu_name', instance.menu_name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        # Clear existing meals and add new ones
        instance.meals.clear()
        for meal_data in meals_data:
            meal = Meal.objects.create(**meal_data)
            instance.meals.add(meal)

        return instance

class TiffinOwnerSerializer(serializers.ModelSerializer):
    tiffin_service = TiffinServiceSerializer(many=True, read_only=True)

    class Meta:
        model = TiffinOwner
        fields = '__all__'
