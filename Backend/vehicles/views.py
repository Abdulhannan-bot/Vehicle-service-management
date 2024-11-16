from django.shortcuts import render
from .models import Vehicle
from .serializers import (
    VehicleSerializer
)
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_vehicles(request):
    vehicles = Vehicle.objects.all()
    registration_number = request.query_params.get('registration_number', None)
    owner_name = request.query_params.get('ownwer_name',None)
    is_repaired = request.query_params.get('is_repaired', None)

    if registration_number:
        vehicles = vehicles.filter(registration_number__icontains=registration_number)
    if owner_name:
        vehicles = vehicles.filter(owner_name__icontains=owner_name)
    if is_repaired is not None:
        vehicles = vehicles.filter(is_repaired=is_repaired.lower() == 'true')

    serializer = VehicleSerializer(vehicles, many=True)
    return Response({'success': True, 'msg': 'Request successful', 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_vehicle_by_id(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Vehicle not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = VehicleSerializer(vehicle)
    return Response({
        'success': True,
        'msg': 'Vehicle retrieved successfully',
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_vehicle(request):
    print(request.data)
    serializer = VehicleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "success": True,
            "msg": "Vehicle added successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
            'success': False,
            'msg': "Invalid Data",
            'errors': serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def edit_vehicle(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Vehicle not found'
        }, status=status.HTTP_404_NOT_FOUND)
    serializer = VehicleSerializer(vehicle, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'msg': 'Vehicle updated successfully',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response({
        'success': False,
        'msg': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_vehicle(request, vehicle_id):
    try:
        vehicle = Vehicle.objects.get(id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Vehicle not found'
        }, status=status.HTTP_404_NOT_FOUND)

    vehicle.delete()

    return Response({
        'success': True,
        'msg': 'Vehicle deleted successfully'
    }, status=status.HTTP_204_NO_CONTENT)





