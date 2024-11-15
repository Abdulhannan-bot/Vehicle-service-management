from django.contrib import admin
from .models import Issue

class IssueAdmin(admin.ModelAdmin):
    list_display = ["id", "vehicle", "status", "created_at"]
    search_fields = ["vehicle", "status"]

admin.site.register(Issue, IssueAdmin)