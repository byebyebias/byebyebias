from rest_framework.routers import SimpleRouter, Route

from backend.core.infrastructure.factories.bias_metrics_factories import BiasMetricsViewSetFactory

class BiasMetricsRouter(SimpleRouter):
    routes = [
        Route(
            url="upload",
            mapping={"post": "get_bias_metrics"},
            initkwargs={'viewset_factory': BiasMetricsViewSetFactory},
            name='get_bias_metrics',
            detail=False
        )
    ]