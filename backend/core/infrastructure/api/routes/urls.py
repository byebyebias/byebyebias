from django.urls import path, include

urlpatterns = [
    path('', include("backend.core.infrastructure.api.routes.bias_metrics.urls"))
]

# add new route to '' by copypasting above path() line but with relevant module in include()