from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Issue
from .serializers import IssueSerializer, GetIssueSerializer

@api_view(['GET'])
def get_issues(request):
    issues = Issue.objects.all()
    serializer = GetIssueSerializer(issues, many=True)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_issue_by_id(request, issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
    except Issue.DoesNotExist:
        return Response({'success': False, 'msg': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = IssueSerializer(issue)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_issue(request):
    print(request.data)
    serializer = IssueSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def update_issue(request, issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
    except Issue.DoesNotExist:
        return Response({'success': False, 'msg': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = IssueSerializer(issue, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_issue(request, issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
    except Issue.DoesNotExist:
        return Response({'success': False, 'msg': 'Issue not found'}, status=status.HTTP_404_NOT_FOUND)
    
    issue.delete()
    return Response({'success': True, 'msg': 'Issue deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
