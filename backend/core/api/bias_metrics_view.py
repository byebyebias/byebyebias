from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.core.interface.controllers.bias_metrics_controller import BiasMetricsController

class BiasMetricsViewSet(ViewSet):
    viewset_factory = None

    @property
    def controller(self) -> BiasMetricsController:
        return self.viewset_factory.create()

    def convert(self, request: Request, *args, **kwargs) -> Response:
        query_params = request.query_params
        payload, status = self.controller.convert(query_params)
        return Response(data=payload, status=status)