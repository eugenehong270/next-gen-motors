# Generated by Django 4.0.3 on 2022-10-25 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_rename_technician_name_service_appointment_technician_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service_appointment',
            old_name='technician_id',
            new_name='technician_name',
        ),
    ]
