from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Analysis

def analysis_home(request, *args, **kwargs):
    return render(request, "pages/home.html", context={}, status=200)

def analysis_list_view(request, *args, **kwargs):
    qs=Analysis.objects.all()
    analysis_list= [{"id": x.id, "plotdata": x.plotdata} for x in qs]
    data={
        "response" : analysis_list
    }
    return JsonResponse(data)

def analysis_view(request, analysis_id, *args, **kwargs):
    data={
        "id" : analysis_id,
    }
    status=200
    try:
        analysis=Analysis.objects.get(id=analysis_id)
        data["plotdata"] = analysis.plotdata
    except:
        data["message"]= "Not Found"
        status=404

    return JsonResponse(data,status=status)
