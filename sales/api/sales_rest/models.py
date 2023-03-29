from email.policy import default
from django.db import models

# Create your models here.
class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)


class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length = 100)
    phone_number = models.CharField(max_length=15)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100,unique=True)
    sold = models.BooleanField(default=False)
    
class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile", #kinda useless ✍️(◔◡◔)
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson", # same here ✍️(◔◡◔)
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        PotentialCustomer,
        related_name="customer", # same here ✍️(◔◡◔)
        on_delete=models.PROTECT,
    )
    price = models.PositiveIntegerField()