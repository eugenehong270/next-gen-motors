from .models import SalesPerson, PotentialCustomer, AutomobileVO, SalesRecord
from common.json import ModelEncoder

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties= [
        "name",
        "address",
        "phone_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": PotentialCustomerEncoder(),
    }