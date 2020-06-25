from django.urls import path, include
from .views import login_view, logout_view, register_view,is_logedin_view


urlpatterns = [

    #GET
    path('login/', login_view),
    path('logout/', logout_view),
    path('check-status/', is_logedin_view),

    #POST
    path('register/', register_view),

]