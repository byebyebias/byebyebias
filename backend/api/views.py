from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from "../actions/bias_metrics" import get_bias_metrics

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "ByeByeBias :)"})

@api_view(["GET"])
def get_dashboard_data():
    bias_metrics = 