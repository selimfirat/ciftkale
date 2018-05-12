from django.db import connection
import csv
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ciftkale.settings")


def csv_printer():
	with open('players.csv', 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
		for row in spamreader:
			print(row)

uname = ['alper', 'hakan', 'selim', 'orkun', 'recep', 'meral', 'muharrem', 'temel']
pword = [222,333,444,555,666,777,888,999]
pnum =  [222,333,444,555,666,777,888,999]


def inserter():
    with connection.cursor() as cursor:
    	for i in range(0,8):
        	cursor.execute("INSERT INTO person (first_name, last_name, e_mail, username, hashed_password, phone_number) VALUES (%s, %s, %s, %s, %s, %s)", [uname[i], uname[i], uname[i], uname[i], pword[i], pnum[i]])

inserter();

#csv_printer()
	
