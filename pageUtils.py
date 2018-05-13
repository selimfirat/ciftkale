from django.contrib import admin
from django.u

import dj_database_url
import django_heroku

from django.db import connection
import string
import random

from django.db.utils import DatabaseError
import name_tools #REQUIRES NAME_TOOLS TO BE DOWNLOADED

def getLeaguesTable(filter_country = "", filter_league = "", sort_query = "", items_per_page = 15, page_num = 0):
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

def getClubsTable(filter_country ="" , filter_league = "", filter_team = "", filter_coach = "", filter_director = "", sort_query = "", items_per_page = 15, page_num = 0):
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

def getPlayersTable(filter_team = "", filter_nation = "", filter_name = "", sort_query = "", items_per_page = 15, page_num = 0):
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

def getPlayerInfo(username):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM Player WHERE player_username = %s", [username])
            row = cursor.fetchone();
            position = row[1]
            kit_number = row[2]
            weight = row[3]
            height = row[4]
            dominant_foot = row[5]

        except DatabaseError:
            return  {'result': 'failed'};
        
        cursor.execute("SELECT * FROM Person WHERE username = %s", [username])
        row = cursor.fetchone();
        full_name = row[2] + " " + row[3]

        cursor.execute("SELECT * FROM Sportsman WHERE sportsman_username = %s", [username])
        row = cursor.fetchone();
        salary = row[2]

        cursor.execute("SELECT co.club_name FROM Player p, CurrentOccupations co WHERE co.sportsman_username = %s", [username])
        row = cursor.fetchone();
        team = row[0]

        cursor.execute("SELECT count(*) FROM Stat WHERE player_username = %s AND description = 'goal' ", [username])
        row = cursor.fetchone();
        goal = row[0]

        cursor.execute("SELECT count(*) FROM Stat WHERE player_username = %s AND description = 'assist' ", [username])
        row = cursor.fetchone();
        assist = row[0]

        cursor.execute("SELECT count(*) FROM Stat WHERE player_username = %s AND description = 'shot' ", [username])
        row = cursor.fetchone();
        shot = row[0]

        cursor.execute("SELECT count(*) FROM Stat WHERE player_username = %s AND description = 'yellow_card' ", [username])
        row = cursor.fetchone();
        yellow_card = row[0]

        cursor.execute("SELECT count(*) FROM Stat WHERE player_username = %s AND description = 'red_card' ", [username])
        row = cursor.fetchone();
        red_card = row[0]

        return {
            'position' : position,
            'kit_number' : kit_number,
            'weight' : weight,
            'height' : height,
            'dominant_foot' : dominant_foot,
            'full_name' : full_name, 
            'salary' : salary,
            'club' : team,
            'goal' : goal,
            'assist' : assist,
            'shot' : shot,
            'yellow_card' : yellow_card,
            'red_card' : red_card
            'result' : 'success'
        }

def getLeagueInfo(leagueName, leagueStart):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM League WHERE league_name = %s league_start= %s", [leagueName, leagueStart])
            row = cursor.fetchone();
            league_name = row[0]
            league_start = row[1]
            league_country = row[3]
            return {'league_name': league_name,
                    'league_start': league_start,
                    'league_country': league_country }

        except DatabaseError:
            return  {'result': 'failed'};

def getClubsInfo(teamName):
    

