from django.urls import path
from . import views

urlpatterns = [
    path('issues/', views.get_issues, name='get_issues'),
    path('issues/<int:issue_id>/', views.get_issue_by_id, name='get_issue_by_id'),
    path('issues/add/', views.add_issue, name='add_issue'),
    path('issues/update/<int:issue_id>/', views.update_issue, name='update_issue'),
    path('issues/delete/<int:issue_id>/', views.delete_issue, name='delete_issue'),
]
