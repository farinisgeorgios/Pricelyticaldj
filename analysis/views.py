from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .models import Analysis, HotelBased, PerimeterBased
from profiles.models import Profile
from .serializers import AnalysisSerializer, HotelBasedSerializer, PerimeterBasedSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_analysis_list(request, *args, **kwargs):
    qs=Analysis.objects.filter(user=request.user).order_by('-id')
    if not qs.exists():
        return Response({},status=status.HTTP_404_NOT_FOUND)
    serializer = AnalysisSerializer(qs,many=True)
    data= serializer.data
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_hotelBased_analysis(request, analysis_id, *args, **kwargs):
    qs=HotelBased.objects.filter(analysis_details__id=analysis_id)
    if not qs.exists():
        return Response({},status=status.HTTP_404_NOT_FOUND)
    serializer = HotelBasedSerializer(qs,many=True)
    data= serializer.data
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_perimeterBased_analysis(request, analysis_id, *args, **kwargs):
    qs=PerimeterBased.objects.filter(analysis_details__id=analysis_id)
    if not qs.exists():
        return Response({},status=status.HTTP_404_NOT_FOUND)
    serializer = PerimeterBasedSerializer(qs,many=True)
    data= serializer.data
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)



@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def create_Analysis_hotelbased(request, *args, **kwargs):
    data=request.data
    data.update({
        'plotdata' : [
        {
            "title" : "Average Price",
            "Text"  : "The average price for a perimeter of the hotel.",
            "x"     : [3,4,5,6,4,5,8,7],
            "y"     : [4,5,8,7,6,8,4,9],
        },
        {
            "title" : "Price per day",
            "Text"  : "Price per day for a perimeter of the hotel",
            "x"     : [5,5,6,9,456,8451,5498,351],
            "y"     : [354,68,2318,384,684,446,648,684],

        }
    ]})

    
    qs = Profile.objects.get(user=request.user)
    if qs and qs.hotelBased_searches > 0:
        qs.hotelBased_searches = qs.hotelBased_searches - 1
        qs.save()
        serializer = HotelBasedSerializer(data=data, context={'request':request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def create_Analysis_perimeterbased(request, *args, **kwargs):
    data = request.data
    data.update({
        'plotdata' : [
        {
            "title" : "Average Price",
            "Text"  : "The average price for a perimeter of the hotel.",
            "x"     : [3,4,5,6,4,5,8,7],
            "y"     : [4,5,8,7,6,8,4,9],
        },
        {
            "title" : "Price per day",
            "Text"  : "Price per day for a perimeter of the hotel",
            "x"     : [5,5,6,9,456,8451,5498,351],
            "y"     : [354,68,2318,384,684,446,648,684],

        }
    ]})
    
    qs = Profile.objects.get(user=request.user)
    if qs and qs.perimeterBased_searches > 0:
        qs.perimeterBased_searches = qs.perimeterBased_searches - 1
        qs.save()
        serializer = PerimeterBasedSerializer(data=data, context={'request':request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({},status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def delete_analysis(request, *args, **kwargs):
    data = request.data
    qs=Analysis.objects.filter(user=request.user,id=data['id'])
    if not qs.exists():
        return Response({},status=status.HTTP_404_NOT_FOUND)
    qs.delete()
    return Response(status=status.HTTP_200_OK)

