from unittest.mock import MagicMock, patch
from rest_framework.test import APITestCase
from rest_framework import status
import json

from backend.core.infrastructure.api.viewsets.bias_metrics_view import BiasMetricsViewSet
from backend.core.infrastructure.factories.bias_metrics_factories import BiasMetricsViewSetFactory

# python manage.py test backend.tests.test_bias_metrics_view

class TestBiasMetricsView(APITestCase):
    @patch('backend.core.interface.controllers.bias_metrics_controller.BiasMetricsController')
    def test_get_bias_metrics_from_file(self, MockBiasMetricsController):
        mock_controller = MagicMock()
        mock_controller.get_bias_metrics_from_file.return_value = ({'metric': 'value'}, status.HTTP_200_OK)
        MockBiasMetricsController.return_value = mock_controller

        mock_request = MagicMock()
        mock_request.FILES = {'file': 'some file'}
        mock_request.POST = {
            'protected_attributes': json.dumps(['sender_gender', 'sender_race'])
        }

        viewset = BiasMetricsViewSet()
        viewset.viewset_factory = MagicMock()
        viewset.viewset_factory.create.return_value = mock_controller

        viewset.get_bias_metrics_from_file(mock_request)

        response = viewset.get_bias_metrics_from_file(mock_request)

        mock_controller.get_bias_metrics_from_file.assert_called_with({'file': 'some file'}, ['sender_gender', 'sender_race'])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'metric': 'value'})


