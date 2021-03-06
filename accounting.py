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

def login(username, password):
    with connection.cursor() as cursor:
        cursor.execute("SELECT username, hashed_password FROM person WHERE username = %s AND hashed_password = %s", [username, password])
        row = cursor.fetchone()
    if (row is not None ):
        return {'result': 'success'}
    else:
        return {'result': 'failed', 'error': 'username or password wrong'}

def register(username, password, fullName, eMail, phone):
    firstName = name_tools.split(fullName)[1]
    lastName = name_tools.split(fullName)[2]
    with connection.cursor() as cursor:
        try:
            cursor.execute("INSERT INTO Person(username, photo, first_name, last_name, hashed_password, e_mail, phone_number, date_of_registration ) VALUES(%s, 'no_photo.png', %s, %s,%s, %s, %s, NULL)", [username, firstName, lastName, password, eMail, phone])
        except DatabaseError:
            return {'result': 'failed', "error": "Username or email or phone exists"}
        return {'result': 'success'}


