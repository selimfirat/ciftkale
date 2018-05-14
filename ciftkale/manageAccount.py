from django.contrib import admin
from django.urls import path, re_path, include
import os
import dj_database_url
import django_heroku
from django.db import connection
import string
import random
import requests

from django.db.utils import DatabaseError

#Source:https://gist.github.com/23maverick23/4131896
def password_generator(size=10, chars=string.ascii_letters + string.digits):
    """
    Returns a string of random characters, useful in generating temporary
    passwords for automated password resets.
    
    size: default=10; override to provide smaller/larger passwords
    chars: default=A-Za-z0-9; override to provide more/less diversity
    
    Credit: Ignacio Vasquez-Abrams
    Source: http://stackoverflow.com/a/2257449
    """
    return ''.join(random.choice(chars) for i in range(size))

def forgotPassword(phone):
    with connection.cursor() as cursor:
        cursor.execute("SELECT phone_number FROM person WHERE phone_number = %s", [phone])
        row = cursor.fetchone()
    if (row is not None ):
        with connection.cursor() as cursor:
            new_password = password_generator()
            payload = {
                "message": "You have reset your password. Your new password for CiftKale transfer market is " + new_password,
                "phoneNumber": phone,
               "senderId": "CiftKale",
               "smsType": "Transactional"
            }
            requests.post("https://g9o2hlg1x6.execute-api.us-east-1.amazonaws.com/prod/sms_aws", payload)

            cursor.execute("UPDATE person SET hashed_password = %s WHERE  phone_number = %s",[new_password, phone])
            return {'result': 'success'}
    else:
        return {'result': 'failed'}

def changePassword(username, currentPass, newPass):
    with connection.cursor() as cursor:
        cursor.execute("SELECT username, hashed_password FROM person WHERE username =%s AND hashed_password = %s", [username, currentPass])
        row = cursor.fetchone()
    if (row is not None ):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE person SET hashed_password = %s WHERE username =%s", [newPass, username]);
            row2 = cursor.fetchone();
            return {'result': 'success'};
    else:
        return {'result': 'failed', "error": "The current password you entered is wrong!" };
    
def changeUsername(curUser, newUser, password):
    with connection.cursor() as cursor:
            cursor.execute("SELECT username FROM person WHERE username =%s AND hashed_password = %s", [curUser, password])
            row = cursor.fetchone()
    if (row is not None ):
        with connection.cursor() as cursor:
            try:
                cursor.execute("UPDATE person SET username = %s  WHERE username =%s", [newUser, curUser]);

            except DatabaseError:
                return  {'result': 'failed', "error": "New username you entered exists! Please try a different username."};

            return {'result': 'success'};
    else:
        return {'result': 'failed', "error": "The current password you entered is wrong!" };


    
