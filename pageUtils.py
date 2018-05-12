from django.contrib import admin
from django.urls import path, re_path, include
import os
import dj_database_url
import django_heroku
from django.db import connection
import string
import random

from django.db.utils import DatabaseError

import name_tools #REQUIRES NAME_TOOLS TO BE DOWNLOADED

def getLeaguesTable(filter_country = "", filter_league = "", sort_query = "", items_per_page, page_num):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM league WHERE league_country ILIKE %s AND league_name ILIKE %s " + sort_query + " LIMIT %s OFFSET %s" , ["%" + filter_country + "%", 
            "%" + filter_league + "%", items_per_page, page_num * items_per_page])
            rows = cursor.fetchall();
        except DatabaseError:
            return  {'result': 'failed'};
        try:
            cursor.execute("SELECT COUNT(*) FROM league ")
            count = int(cursor.fetchone());
        except DatabaseError:
            return  {'result': 'failed'};

    return {
        'res': rows,
        'num_rows' : count,
        'result': 'success'
    }

def getClubsTable(filter_country ="" , filter_league = "", filter_team = "", filter_coach = "", filter_director = "", sort_query = "", items_per_page, page_num):
    with connection.cursor() as cursor:
        #HAKAN coach ve Director filtrelemerini halledecek...
        try:
            cursor.execute("SELECT * FROM club WHERE country ILIKE %s AND league_name ILIKE %s AND filter_team ILIKE %s AND  " + sort_query + " LIMIT %s OFFSET %s" , ["%" + filter_country + "%", 
            "%" + filter_league + "%", "%" + filter_team + "%", "%" + filter_coach + "%", "%" + filter_director + "%",items_per_page, page_num * items_per_page])
            rows = cursor.fetchall();
        except DatabaseError:
            return  {'result': 'failed'};
        try:
            cursor.execute("SELECT COUNT(*) FROM club")
            count = int(cursor.fetchone());
        except DatabaseError:
            return  {'result': 'failed'};

    return {
        'res': rows,
        'num_rows' : count,
        'result': 'success'
    }

def getPlayersTable(filter_team = "", filter_nation = "", filter_name = "", sort_query = "", items_per_page, page_num):
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                """
                SELECT * FROM Person u, Player p, Club c NATURAL JOIN CurrentOccupations co 
                WHERE u.username = p.player_username 
                AND p.player_username = co.sportsman_username 
                AND c.club_name ILIKE %s 
                AND p.nationality ILIKE %s 
                AND (u.first_name + ' ' + u.last_name ILIKE %s OR u.last_name + ' ' + u.first_name ILIKE %s)
                """ + sort_query + 
                " LIMIT %s OFFSET %s" , 
                # BİTTİ AMK
                ["%" + filter_team + "%", 
                "%" + filter_nation + "%", 
                "%" + filter_name + "%",
                "%" + filter_name + "%", 
                items_per_page, 
                page_num * items_per_page]
            )
            rows = cursor.fetchall();
        except DatabaseError:
            return  {'result': 'failed'};
        try:
            cursor.execute("SELECT COUNT(*) FROM Player ")
            count = int(cursor.fetchone());
        except DatabaseError:
            return  {'result': 'failed'};

    return {
        'res': rows,
        'num_rows' : count,
        'result': 'success'
    }


