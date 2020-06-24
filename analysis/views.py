from django.shortcuts import render, redirect
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import status
from rest_framework.response import Response 
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .models import Analysis, HotelBased, PerimeterBased
from .serializers import AnalysisSerializer, HotelBasedSerializer, PerimeterBasedSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_analysis_list(request, *args, **kwargs):
    qs=Analysis.objects.filter(user=request.user)
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
        return Response({},status==status.HTTP_404_NOT_FOUND)
    serializer = HotelBasedSerializer(qs,many=True)
    data= serializer.data
    return Response(serializer.data[0], status=status.HTTP_202_ACCEPTED)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_perimeterBased_analysis(request, analysis_id, *args, **kwargs):
    qs=PerimeterBased.objects.filter(analysis_details__id=analysis_id)
    if not qs.exists():
        return Response({},status=status.HTTP_404_NOT_FOUND)
    serializer = PerimeterBasedSerializer(qs,many=True)
    data= serializer.data
    return Response(serializer[0].data, status=status.HTTP_202_ACCEPTED)



@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def create_Analysis_hotelbased(request, *args, **kwargs):
    serializer = HotelBasedSerializer(data=request.data, context={'request':request})
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@parser_classes([JSONParser])
@permission_classes([IsAuthenticated])
def create_Analysis_perimeterbased(request, *args, **kwargs):
    data = request.data
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

