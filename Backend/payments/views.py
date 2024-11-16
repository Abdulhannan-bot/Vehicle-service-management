from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from .serializers import PaymentSerializer, GetPaymentSerializer

@api_view(['GET'])
def get_payments(request):
    payments = Payment.objects.all()
    serializer = GetPaymentSerializer(payments, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_payment_by_id(request, payment_id):
    try:
        payment = Payment.objects.get(id=payment_id)
    except Payment.DoesNotExist:
        return Response({'success': False, 'msg': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PaymentSerializer(payment)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_payment(request, payment_id):
    try:
        payment = Payment.objects.get(id=payment_id)
    except Payment.DoesNotExist:
        return Response({'success': False, 'msg': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PaymentSerializer(payment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_payment(request, payment_id):
    try:
        payment = Payment.objects.get(id=payment_id)
    except Payment.DoesNotExist:
        return Response({'success': False, 'msg': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    
    payment.delete()
    return Response({'success': True, 'msg': 'Payment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
