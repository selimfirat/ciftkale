from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import *
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def request_handler(request, param):
  return HttpResponse('yolo')