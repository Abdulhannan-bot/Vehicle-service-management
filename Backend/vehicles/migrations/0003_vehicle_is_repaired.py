# Generated by Django 5.1.3 on 2024-11-14 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0002_remove_vehicle_vehicle_type_vehicle_issue_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='is_repaired',
            field=models.BooleanField(default=False),
        ),
    ]
