from django.db import connection
from django.db.utils import DatabaseError

import csv
import os
import name_tools
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ciftkale.settings")
uniqueRandomNum = random.sample(range(1000, 10000), 1000)


def createOffer(price, director_sender, director_receiver, status = 'pending', offer_id = None):
    if offer_id is None:
        offer_id = 'DEFAULT'

    with connection.cursor() as cursor:
        try:
            cursor.execute("INSERT INTO offer (offer_id, date, price, status, director_sender, director_receiver) VALUES ("+ offer_id +", now(), %s, %s, %s, %s)", [price, status, director_sender, director_receiver])
        except DatabaseError:
            raise
            return { 'result': 'failed' }

    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT MAX(offer_id) FROM offer")
            o_id = int(cursor.fetchone()[0])
        except :
            raise e
        return { 'result': 'success',
                 'offer_id': o_id }                           



def createBucket(offer_id, player_username):

    with connection.cursor() as cursor:
        try:
            cursor.execute("INSERT INTO bucket (offer_id, player_username) VALUES (%s, %s)", [offer_id, player_username])
        except DatabaseError:
            #raise
            return { 'result': 'failed' }

        return { 'result': 'success' }                           



def getOffersOfDirector(username):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM offer WHERE director_sender = %s", [username])
            sentOffers = list(list(x) for x in cursor.fetchall())
            for i in range(len(sentOffers)):
                offer_id = sentOffers[i][0]
                
                players = []
                cursor.execute("SELECT u.first_name, u.last_name FROM (Bucket NATURAL JOIN Player) p, PlayerDirector pd, Person u WHERE u.username = p.player_username AND p.offer_id = %s AND pd.player_username = p.player_username AND pd.director_username = %s", [offer_id, username])
                for p in cursor.fetchall():
                    players.append(p[0] + ' ' + p[1])
                print(players)
                sentOffers[i].append(players)
                newplayers = []
                cursor.execute("SELECT u.first_name, u.last_name FROM (Bucket NATURAL JOIN Player) p, PlayerDirector pd, Person u WHERE u.username = p.player_username AND p.offer_id = %s AND pd.player_username = p.player_username", [offer_id])
                for p in cursor.fetchall():
                    name = p[0] + ' ' + p[1]
                    if name not in players:
                        newplayers.append(name)
                print(newplayers)
                sentOffers[i].append(newplayers)
        except DatabaseError:
            raise
            return { 'result': 'failed' }

    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM offer WHERE director_receiver = %s", [username])
            receivedOffers = list(list(x) for x in cursor.fetchall())
            for i in range(len(receivedOffers)):
                offer_id = receivedOffers[i][0]
                
                players = []
                cursor.execute("SELECT u.first_name, u.last_name FROM (Bucket NATURAL JOIN Player) p, PlayerDirector pd, Person u WHERE u.username = p.player_username AND p.offer_id = %s AND pd.player_username = p.player_username AND pd.director_username = %s", [offer_id, username])
                for p in cursor.fetchall():
                    players.append(p[0] + ' ' + p[1])
                print(players)
                receivedOffers[i].append(players)
                newplayers = []
                cursor.execute("SELECT u.first_name, u.last_name FROM (Bucket NATURAL JOIN Player) p, PlayerDirector pd, Person u WHERE u.username = p.player_username AND p.offer_id = %s AND pd.player_username = p.player_username", [offer_id])
                for p in cursor.fetchall():
                    name = p[0] + ' ' + p[1]
                    if name not in players:
                        newplayers.append(name)
                print(newplayers)
                receivedOffers[i].append(newplayers)
            
        except DatabaseError:
            raise
            return { 'result': 'failed' }


    return {  'result': 'success', 
              'sentOffers': sentOffers,
              'receivedOffers': receivedOffers } 


def respondToOffer(offer_id, respond = 'canceled'):
    with connection.cursor() as cursor:
        try:
            cursor.execute("SELECT * FROM offer WHERE offer_id = %s", [offer_id])
            row = cursor.fetchone()
            status = row[3]

            if status is not None and status == 'pending':
                cursor.execute("UPDATE offer SET status = %s WHERE offer_id = %s", [respond, offer_id])
                return { 'result': 'success'}
            else: 
                return { 'result': 'failed' }

        except DatabaseError:
            #raise
            return { 'result': 'failed' }    



#print(respondToOffer(5, 'accepted'))
#print(getOffersOfDirector('Boyd'))
#print(createOffer('2017-05-14', '100000', 'Bond', 'Boyd'))
#print(createBucket('1234', 'Abraham160741' )