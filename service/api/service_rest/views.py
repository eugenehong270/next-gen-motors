from django.shortcuts import render
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Service_Appointment
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

# Create your views here.
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin"
    ]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = {
        "technician_name",
        "employee_number",
        "id"
    }


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = {
        "technician_name",
        "employee_number",
        "id"
    }


class Service_AppointmentDetailEncoder(ModelEncoder):
    model = Service_Appointment
    properties = [
        "add_vin",
        "customer_name",
        "date",
        "time",
        "technician",
        "reason",
        "id",
        "finished"
    ]

    encoders ={
        "technician": TechnicianDetailEncoder()
    }

    def get_extra_data(self, o):
        try:
            AutomobileVO.objects.get(vin=o.add_vin)
            return{"VIP": True}
        except:
            return {"VIP": False}


#################################################################


#MATCHES WITH CLASS TECHNICIAN
@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    #LISTING THE TECHNICIANS
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder
        )
    #CREATING A TECHNICIAN
    else:
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )

#SHOWS DETAILS FOR TECHNICIAN
@require_http_methods(["DELETE", "GET"])
def api_detail_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    else:
        request.method == "DELETE"
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
##################################################################

#MATCHES WITH CLASS SERVICE_APPOINTMENT
@require_http_methods(["GET", "POST"])
def api_list_service_appointment(request):
    #LISTING APPOINTMENTS
    if request.method == "GET":
        appointments = Service_Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=Service_AppointmentDetailEncoder
        )

    #CREATING AN APPOINTMENT
    else:
        content = json.loads(request.body)
        try:
            id = content["technician"]
            technician = Technician.objects.get(id=id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician name"},
                status=400
            )

        appointment = Service_Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=Service_AppointmentDetailEncoder,
            safe=False,
        )

#SHOWS DETAILS FOR APPOINTMENT
@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_service_appointment(request, pk):
    if request.method == "GET":
        appointment = Service_Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=Service_AppointmentDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Service_Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        appointment = Service_Appointment.objects.get(id=pk)
        setattr(appointment, "finished", content["finished"])
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=Service_AppointmentDetailEncoder,
            safe=False
        )

#SHOWS DETAIL HISTORY
@require_http_methods(["GET"])
def api_service_history(request, add_vin):
    history = Service_Appointment.objects.filter(add_vin=add_vin)
    return JsonResponse(
        history,
        encoder=Service_AppointmentDetailEncoder,
        safe=False
    )
