from django.urls import path, include

urlpatterns = [
    path('', include("backend.core.infrastructure.api.routes.bias_metrics.urls"))
]