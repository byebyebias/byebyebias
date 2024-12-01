from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

import json

from backend.core.interface.controllers.bias_metrics_controller import BiasMetricsController

class BiasMetricsViewSet(ViewSet):
    viewset_factory = None

    @property
    def controller(self) -> BiasMetricsController:
        return self.viewset_factory.create()

    def get_bias_metrics(self, request: Request, *args, **kwargs) -> Response:
        request_files = request.FILES
        request_protected_attributes = json.loads(request.POST.get("protected_attributes"))
        payload, status = self.controller.get_bias_metrics(request_files, request_protected_attributes)
        return Response(data=payload, status=status)