from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from .models import Prompt
from .serializers import PromptSerializer

# Create your views here.
@api_view(['POST'])
def prompt(request):
  if request.method == 'POST':
    data = JSONParser().parse(request)
    serializer = PromptSerializer(data=data)
    if serializer.is_valid():
      serializer.save()

      # TODO send data to AI model
      # TODO return response from AI model

      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
