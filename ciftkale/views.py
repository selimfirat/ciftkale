from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import *
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

from .pageUtils import *
from .accounting import *
from .manageAccount import *

import json

@csrf_exempt
def login_view(request):
  r = json.loads(request.body)
  username = r['username']
  password = r['password']
  response = login(username, password)
  return JsonResponse(response)

@csrf_exempt
def register_view(request):
  r = json.loads(request.body)
  username  = r['username']
  password  = r['password']
  full_name = r['full_name']
  phone     = r['phone']
  email     = r['email']

  response = register(username, password, full_name, email, phone)
  return JsonResponse(response)

@csrf_exempt
def forgotpassword_view(request):
  r = json.loads(request.body)
  phone = r['phone']
  response = forgotPassword(phone)
  return JsonResponse(response)


@csrf_exempt
def changepassword_view(request):
  r = json.loads(request.body)
  username         = r['username']
  current_password = r['current_password']
  new_password     = r['new_password']

  response = changePassword(username, current_password, new_password)
  return JsonResponse(response)

@csrf_exempt
def deleteownaccount_view(request):
  r = json.loads(request.body)
  username         = r['username']
  current_password = r['current_password']

  #response = deleteOwnAccount(username, current_password)
  response = {'result': 'success'}
  return JsonResponse(response)

@csrf_exempt
def changephoto_view(request):
  r = json.loads(request.body)
  #username         = r['username']
  #current_password = r['current_password']

  #response = deleteOwnAccount(username, current_password)
  response = {'result': 'success'}
  response = {'result': 'failed', 'error': 'API Misuse'}
  return JsonResponse(response)

@csrf_exempt
def changeusername_view(request):
  r = json.loads(request.body)
  username         = r['username']
  current_password = r['current_password']
  new_username     = r['new_username']

  response = changeUsername(username, new_username, current_password)
  return JsonResponse(response)


@csrf_exempt
def leagues_view(request):
  page          = int(request.GET['page'])
  pageSize      = int(request.GET['pageSize'])
  sortInfo      = request.GET.get('sortInfo')
  filterCountry = request.GET.get('filterCountry', '')
  filterLeague  = request.GET.get('filterLeague', '')


  sort_map = {
    'country': 'league_country',
    'name': 'league_name'
  }

  sortQuery = ""
  if sortInfo:
    sortInfo = json.loads(sortInfo)
    for info in sortInfo:
      if len(sortQuery) == 0:
        sortQuery = " ORDER BY " # güdükbay
      else:
        sortQuery += ","
      
      if info['id'] in sort_map:
        sortQuery += f" {sort_map[info['id']]} {'DESC' if info['desc'] else 'ASC'} "

  response = getLeaguesTable(filterCountry, filterLeague, sortQuery, pageSize, page)
  return JsonResponse(response)


@csrf_exempt
def league_view(request):
  leagueName  = request.GET['leagueName']
  leagueStart = request.GET['leagueStart']

  response = getLeagueInfo(leagueName, leagueStart)
  return JsonResponse(response)


     if (info.id === 'country') {
            params['filterCountry'] = info.value;
        } else if (info.id === 'league') {
            params['filterLeague'] = info.value;
        } else if (info.id === 'name') {
            params['filterTeam'] = info.value;
        } else if (info.id === 'coach') {
            params['filterCoach'] = info.value;
        } else if (info.id === 'director') {
            params['filterDirector'] = info.value;
        }
@csrf_exempt
def clubs_view(request):
  page            = int(request.GET['page'])
  pageSize        = int(request.GET['pageSize'])
  sortInfo        = request.GET.get('sortInfo')
  filterCountry   = request.GET.get('filterCountry', '')
  filterLeague    = request.GET.get('filterLeague', '')
  filterTeam      = request.GET.get('filterTeam', '')
  filterCoach     = request.GET.get('filterCoach', '')
  filterDirector  = request.GET.get('filterDirector', '')

  sort_map = {
    'country': 'c.club_name',
    'league': 'c.league_name',
    'name': 'c.club_name',
    'coach': 'ch.coach_username',
    'director': 'd.director_username'
  }

  sortQuery = ""
  if sortInfo:
    sortInfo = json.loads(sortInfo)
    for info in sortInfo:
      if len(sortQuery) == 0:
        sortQuery = " ORDER BY " # güdükbay
      else:
        sortQuery += ","
      
      if info['id'] in sort_map:
        sortQuery += f" {sort_map[info['id']]} {'DESC' if info['desc'] else 'ASC'} "

  response = getLeaguesTable(filterCountry, filterLeague, filterTeam, filterCoach, filterDirector, sortQuery, pageSize, page)
  return JsonResponse(response)