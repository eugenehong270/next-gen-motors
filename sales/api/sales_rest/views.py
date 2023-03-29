from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from .models import SalesPerson, PotentialCustomer, AutomobileVO, SalesRecord
from .encoders import SalesPersonEncoder, PotentialCustomerEncoder, AutomobileVOEncoder, SalesRecordEncoder

# AutomobileVO
#-------------------------------------------------------------#
@require_http_methods(["GET"])
def api_automobiles(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": autos},
        encoder=AutomobileVOEncoder,
    )


# SalesPerson
#-------------------------------------------------------------#
@require_http_methods(["GET", "POST"])
def api_sales_people(request):
    if request.method == "GET":
        people = SalesPerson.objects.all().order_by("name")
        # salespersons = SalesPerson.objects.all().order_by("name")
        return JsonResponse(
            {"people": people},
            encoder=SalesPersonEncoder,
            safe=False
            )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson, #used be {"salesperson":salespeople}
                encoder = SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"hi":"something is not working"},
                status=404,
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_sales_person(request,pk):
    if request.method == "GET":
        try:
            people = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                people,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({
                "uhm":"you did this wrong hoe"
            })
    elif request.method == "DELETE":
        count, _= SalesPerson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "person" in content:
                person = SalesPerson.objects.get(
                    name = content["person"]
                )
                content["person"] = person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"hey":"something is wrong and couldn't update"},
                status=400,
            )
        SalesPerson.objects.filter(id=pk).update(**content)
        person =SalesPerson.objects.get(id=pk)
        return JsonResponse (
            person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


# PotentialCustomer
#-------------------------------------------------------------#
@require_http_methods(["GET", "POST"])
def api_potential_customers(request):
    if request.method == "GET":
        try:
            sales = PotentialCustomer.objects.all().order_by("name")
            return JsonResponse(
                {"sales":sales},
                encoder = PotentialCustomerEncoder,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse({"message": "Does not exist!!!"})
    else:
        try:
            content = json.loads(request.body)
            customer = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                {"customer": customer}, 
                encoder = PotentialCustomerEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"hi":"something is not working"},
                status=404,
            )



@require_http_methods(["GET","DELETE"])
def api_potential_customer(request, pk):
    if request.method == "GET":
        try:
            customer = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=PotentialCustomerEncoder,
                safe=False
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist, so now lets get this bread"})
            response.status_code = 404
            return response
    else:
        count, _= PotentialCustomer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


# SalesRecord
#-------------------------------------------------------------#
@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    if request.method == "GET":
        sales = SalesRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder = SalesRecordEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            vin = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = vin
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"hey": "vin does not exit, please use a bike"},
                status=404
            ),
        try:
            salesperson = SalesPerson.objects.get(employee_number=content["salesperson"])
            content["salesperson"] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"so":"I may be bi but I will forever be bi-myself. Also salesperson does NOT exist"},
                status=404
            )
        try:                                                 # customer.phone_number
            customer = PotentialCustomer.objects.get(phone_number=content["customer"])
            content["customer"] = customer
        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"be weird":"be queer. Also phone number does not exist"},
                status=404
            )

        sale = SalesRecord.objects.create(**content)
        return JsonResponse(
            sale,
            encoder = SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_sales_record(request, pk):
    if request.method == "GET":
        try:
            sale = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message":"omg it does not exist"},
                status = 404
            )
    else:
        count, _= SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
