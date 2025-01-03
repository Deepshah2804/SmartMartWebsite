# Generated by Django 5.1 on 2024-09-24 11:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_tiffinservice_menu'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tiffinservice',
            name='meal_options',
        ),
        migrations.RemoveField(
            model_name='tiffinservice',
            name='menu',
        ),
        migrations.RemoveField(
            model_name='tiffinservice',
            name='price_per_meal',
        ),
        migrations.RemoveField(
            model_name='tiffinservice',
            name='tiffin_service',
        ),
        migrations.AddField(
            model_name='tiffinservice',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='tiffinservice',
            name='meals',
            field=models.ManyToManyField(related_name='tiffin_services', to='app.meal'),
        ),
        migrations.AddField(
            model_name='tiffinservice',
            name='menu_name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='tiffinservice',
            name='tiffin_owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tiffin_services', to='app.tiffinowner'),
        ),
    ]
