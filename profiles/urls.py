from django.urls import path
from .views import profile_view, set_hotelbased_searches, set_perimeterbased_searches

urlpatterns = [
    path('set/hotelbased/', set_hotelbased_searches),
    path('set/perimeterbased/', set_perimeterbased_searches),
    path('', profile_view),
    
]