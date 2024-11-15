from django.shortcuts import render
from .models import Component
from .serializers import ComponentSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def get_components(request):
    components = Component.objects.all()
    component_type = request.query_params.get('component_type', None)
    if component_type:
        components = components.filter(component_type=component_type)
    serializer = ComponentSerializer(components, many=True)
    return Response({'success': True, 'msg': 'Request successful', 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_component_by_id(request, component_id):
    try:
        component = Component.objects.get(id=component_id)
    except Component.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Component not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ComponentSerializer(component)
    return Response({
        'success': True,
        'msg': 'Component retrieved successfully',
        'data': serializer.data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_component(request):
    serializer = ComponentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "success": True,
            "msg": "Component added successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
            'success': False,
            'msg': "Invalid Data",
            'errors': serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_component(request, component_id):
    try:
        component = Component.objects.get(id=component_id)
    except Component.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Component not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ComponentSerializer(component, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'msg': 'Component updated successfully',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    return Response({
        'success': False,
        'msg': 'Invalid data',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_component(request, component_id):
    try:
        component = Component.objects.get(id=component_id)
    except Component.DoesNotExist:
        return Response({
            'success': False,
            'msg': 'Component not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    component.delete()
    return Response({
        'success': True,
        'msg': 'Component deleted successfully'
    }, status=status.HTTP_204_NO_CONTENT)
