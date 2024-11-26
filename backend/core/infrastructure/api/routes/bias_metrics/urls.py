from django.conf.urls import include
from django.urls import path

from backend.core.infrastructure.api.routes.bias_metrics.router import BiasMetricsRouter
from backend.core.infrastructure.api.viewsets.bias_metrics_view import BiasMetricsViewSet

bias_metrics_router = BiasMetricsRouter()
bias_metrics_router.register('', viewset=BiasMetricsViewSet, basename='')

urlpatterns = [
    path('', include(bias_metrics_router.urls))
]