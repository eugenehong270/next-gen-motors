# Generated by Django 4.0.3 on 2022-10-25 17:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_automobilevo_vin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service_appointment',
            old_name='technician_name',
            new_name='technician_id',
        ),
    ]
