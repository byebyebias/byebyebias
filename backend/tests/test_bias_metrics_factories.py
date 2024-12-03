from unittest import TestCase
from unittest.mock import MagicMock, patch

from backend.core.infrastructure.factories.bias_metrics_factories import BiasMetricsViewSetFactory
from backend.core.use_cases.calculate_metrics_interactor import CalculateMetricsInteractor
from backend.core.use_cases.convert_file_interactor import ConvertFileInteractor
from backend.core.use_cases.upload_file_interactor import UploadFileInteractor
from backend.core.use_cases.process_link_interactor import ProcessLinkInteractor

from backend.core.data_access.file_repository import FileRepository

from backend.core.interface.controllers.bias_metrics_controller import BiasMetricsController

# python3.12 manage.py test backend.tests.test_bias_metrics_factories

class TestBiasMetricsFactories(TestCase):

    @patch('backend.core.infrastructure.factories.bias_metrics_factories.CalculateMetricsInteractorFactory.get')
    def test_calculate_metrics_interactor_factory(self, MockCalculateMetricsInteractorFactory):
        # mock the factory return value
        mock_calculate_metrics_interactor = MagicMock(CalculateMetricsInteractor)
        MockCalculateMetricsInteractorFactory.return_value = mock_calculate_metrics_interactor

        # call the factory's create method
        bias_metrics_controller = BiasMetricsViewSetFactory.create()

        # Assert that the factory method was called
        MockCalculateMetricsInteractorFactory.assert_called_once()
        self.assertIsInstance(bias_metrics_controller, BiasMetricsController)

    @patch('backend.core.infrastructure.factories.bias_metrics_factories.ProcessLinkInteractorFactory.get')
    def test_process_link_interactor_factory(self, MockProcessLinkInteractorFactory):
        mock_process_link_interactor = MagicMock(ProcessLinkInteractor)
        MockProcessLinkInteractorFactory.return_value = mock_process_link_interactor

        # call the factory's create method
        bias_metrics_controller = BiasMetricsViewSetFactory.create()
        MockProcessLinkInteractorFactory.assert_called_once()

        self.assertEqual(bias_metrics_controller.process_link_interactor, mock_process_link_interactor)
        self.assertIsInstance(bias_metrics_controller, BiasMetricsController)

    @patch('backend.core.infrastructure.factories.bias_metrics_factories.ConvertFileInteractorFactory.get')
    def test_convert_file_interactor_factory(self, MockConvertFileInteractorFactory):
        mock_convert_file_interactor = MagicMock(ConvertFileInteractor)
        MockConvertFileInteractorFactory.return_value = mock_convert_file_interactor

        # call the factory's create method
        bias_metrics_controller = BiasMetricsViewSetFactory.create()
        MockConvertFileInteractorFactory.assert_called_once()

        self.assertEqual(bias_metrics_controller.convert_file_interactor, mock_convert_file_interactor)
        self.assertIsInstance(bias_metrics_controller, BiasMetricsController)
    
    @patch('backend.core.infrastructure.factories.bias_metrics_factories.UploadFileInteractorFactory.get')
    def test_upload_file_interactor_factory(self, MockUploadFileInteractorFactory):
        mock_upload_file_interactor = MagicMock(UploadFileInteractor)
        MockUploadFileInteractorFactory.return_value = mock_upload_file_interactor

        # call the factory's create method
        bias_metrics_controller = BiasMetricsViewSetFactory.create()
        MockUploadFileInteractorFactory.assert_called_once()

        self.assertEqual(bias_metrics_controller.upload_file_interactor, mock_upload_file_interactor)
        self.assertIsInstance(bias_metrics_controller, BiasMetricsController)
