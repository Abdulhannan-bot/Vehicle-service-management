# Generated by Django 5.1.3 on 2024-11-14 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('issues', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='issue',
            name='component',
        ),
        migrations.AddField(
            model_name='issue',
            name='issue_type',
            field=models.CharField(choices=[(1, 'New Component'), (2, 'Repair')], default=2, max_length=10),
        ),
        migrations.AlterField(
            model_name='issue',
            name='status',
            field=models.CharField(choices=[(1, 'Pending'), (2, 'Resolved')], default=1, max_length=10),
        ),
    ]