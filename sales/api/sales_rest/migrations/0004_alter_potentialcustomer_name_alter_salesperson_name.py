# Generated by Django 4.0.3 on 2022-10-25 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_alter_salesrecord_automobile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='potentialcustomer',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
