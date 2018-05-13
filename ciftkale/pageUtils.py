from django.contrib import admin

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
            cursor.execute("SELECT * FROM league NATURAL JOIN LeagueCountry WHERE league_country ILIKE %s AND league_name ILIKE %s " + sort_query + " LIMIT %s OFFSET %s" , ["%" + filter_country + "%", 
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
            'red_card' : red_card,
            'result' : 'success'
        }

def getLeagueInfo(leagueName, leagueStart):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM League WHERE league_name = %s AND league_start= %s", [leagueName, leagueStart])
            row = cursor.fetchone();
            league_name = row[0]
            league_start = row[1]
            league_country = row[3]
        except DatabaseError:
            return  {'result': 'failed'};

        cursor.execute("SELECT * FROM LeagueSponsor WHERE league_name = %s AND league_start= %s", [leagueName, leagueStart])
        row = cursor.fetchone();
        
        return {'league_name': league_name,
                    'league_start': league_start,
                    'league_country': league_country,
                    'sponsor' : row[0], 
                    'result': 'success'}

def getClubsInfo(clubName):
     with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM Club WHERE club_name = %s ", [clubName])
            row = cursor.fetchone();

            long_name = row[0];
            short_name = row[1];
            date_of_foundation = row [3];
            transfer_budget = row [4];
            stadium = row[6]
            country = [7]
        except DatabaseError:
            return  {'result': 'failed'};
        
        cursor.execute("SELECT p.first_name, p.last_name FROM CurrentOccupation co, Director d, Person p WHERE d.director_username = co.sportsman_username AND p.username = co.sportsman_username AND club_name = %s" [clubName])
        row = cursor.fetchone();
        director_name = row[0] + " " + row[1]

        cursor.execute("SELECT p.first_name, p.last_name FROM CurrentOccupation co, Coach c, Person p WHERE c.coach_username = co.sportsman_username AND p.username = co.sportsman_username AND club_name = %s" [clubName])
        row = cursor.fetchone();
        coach_name = row[0] + " " + row[1]

        return {'long_name' : long_name,
                'short_name' : short_name,
                'date_of_foundation': date_of_foundation,
                'transfer_budget': transfer_budget,
                'stadium': stadium,
                'country': country,
                'director_name' : director_name,
                'coach_name' : coach_name,
                'result': 'success'}

def getCoachInfo(username):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM Coach WHERE coach_username = %s", [username])
            row = cursor.fetchone()

            exp = rows[1]
        except DatabaseError:
            return  {'result': 'failed'};
        
        cursor.execute("""SELECT p.first_name, p.last_name, s.date_of_birth, s.salary, co.club_name
        FROM CurrentOccupation co, Coach c, Person p, Sportsman s 
        WHERE c.coach_username = co.sportsman_username 
        AND p.username = co.sportsman_username 
        AND s.spartsman_username = p.username
        AND c.coach_username = %s"""
        , [username])
        row = cursor.fetchone()

        full_name = row[0] + " " + row[1]
        date_of_birth = row[2]
        salary = row[3]
        club_name = row[4]

        return {
            'full_name' : full_name,
            'exprience' : exp, 
            'date_of_birth' : date_of_birth,
            'salary' : salary,
            'club_name' : club_name,
            'result' : 'success' 
        }
