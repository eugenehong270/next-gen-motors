from django.urls import path

from .views import api_list_technician, api_list_service_appointment, api_detail_technician, api_show_service_appointment, api_service_history

urlpatterns = [
    path("technicians/", api_list_technician, name="api_create_technician"),
    path("technicians/<int:pk>/",
        api_detail_technician,
        name="api_detail_technician",
    ),
 path("appointments/", api_list_service_appointment, name="api_create_service_appointment"),
 path("appointments/<int:pk>/", api_show_service_appointment, name="api_show_service_appointment"),
 path("history/<str:add_vin>/", api_service_history, name="api_service_history_appointment"),


]
