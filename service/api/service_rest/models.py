from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=200)


class Service_Appointment(models.Model):
    add_vin = models.CharField(max_length=200)
    customer_name = models.CharField(max_length=200)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE
    )
    reason = models.CharField(max_length=200)
    VIP = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
