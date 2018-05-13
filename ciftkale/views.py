from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import *
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

from pageUtils import *
from accounting import *
from manageAccount import *

@csrf_exempt
def login_view(request):
  try:
    username = request.POST['username']
    password = request.POST['password']
    response = login(username, password)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)

@csrf_exempt
def register_view(request):
  try:
    username  = request.POST['username']
    password  = request.POST['password']
    full_name = request.POST['full_name']
    phone     = request.POST['phone']
    email     = request.POST['email']

    response = register(username, password, full_name, email, phone)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)

@csrf_exempt
def forgotpassword_view(request):
  try:
    phone = request.POST['phone']
    response = forgotPassword(phone)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)


@csrf_exempt
def changepassword_view(request):
  try:
    username         = request.POST['username']
    current_password = request.POST['current_password']
    new_password     = request.POST['new_password']

    response = forgotPassword(username, current_password, new_password)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)

@csrf_exempt
def deleteownaccount_view(request):
  try:
    username         = request.POST['username']
    current_password = request.POST['current_password']

    #response = deleteOwnAccount(username, current_password)
    response = {'result': 'success'}
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)

@csrf_exempt
def changephoto_view(request):
  try:
    #username         = request.POST['username']
    #current_password = request.POST['current_password']

    #response = deleteOwnAccount(username, current_password)
    response = {'result': 'success'}
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)

@csrf_exempt
def changeusername_view(request):
  try:
    username         = request.POST['username']
    current_password = request.POST['current_password']
    new_username     = request.POST['new_username']

    response = changeUsername(username, new_username, current_password)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)


@csrf_exempt
def leagues_view(request):
  try:
    page          = request.GET['page']
    pageSize      = request.GET['pageSize']
    sortCountry   = request.GET.get('sortCountry', None)
    sortLeague    = request.GET.get('sortLeague', None)
    filterCountry = request.GET.get('filterCountry', '')
    filterLeague  = request.GET.get('filterLeague', '')

    sortQuery = ""
    if sortCountry is not None:
      sortQuery += f" league_country {'DESC' if sortCountry else 'ASC'} "
    if sortLeague is not None:
      sortLeague += f", league_name {'DESC' if sortLeague else 'ASC'} "

    response = getLeaguesTable(filterCountry, filterLeague, sortQuery, pageSize, page)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)


@csrf_exempt
def league_view(request):
  try:
    leagueName  = request.GET['leagueName']
    leagueStart = request.GET['leagueStart']

    response = getLeagueInfo(leagueName, leagueStart)
  except:
    response = {'result': 'failed', 'error': 'API Misuse'}
  finally:
    return JsonResponse(response)