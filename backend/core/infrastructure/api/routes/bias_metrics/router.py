from rest_framework.routers import SimpleRouter, Route

from backend.core.infrastructure.factories.bias_metrics_factories import BiasMetricsViewSetFactory

class BiasMetricsRouter(SimpleRouter):
    routes = [
        Route(
            url="upload",
            mapping={"post": "get_bias_metrics_from_file"},
            initkwargs={'viewset_factory': BiasMetricsViewSetFactory},
            name='get_bias_metrics_from_file',
            detail=False
        ),
        Route(
            url="process_link",
            mapping={"post": "get_bias_metrics_from_link"},
            initkwargs={'viewset_factory': BiasMetricsViewSetFactory},
            name='get_bias_metrics_from_link',
            detail=False
        )
    ]