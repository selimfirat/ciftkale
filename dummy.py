from django.db import connection
from django.db.utils import DatabaseError

import csv
import os
import name_tools
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ciftkale.settings")


league_start = "2017-09-01"
league_end = "2018-06-01"


"""
csv format:  ID 	name	full_name	club	league	 birth_date	 height_cm	weight_kg	nationality	 eur_wage  overall	shoot 	preferred_foot
"""


#initialization of person, sportsman, player, league, league country, club, works for
def inserter():
	with open('ciftkale/players.csv', 'r') as players:
		with connection.cursor() as cursor:
			player_reader = csv.reader(players, delimiter=',', quotechar='|')
			uniqueRandomNum = random.sample(range(1000, 10000), 1000)
			randomKitNumber = random.sample(range(1, 100), 99)

			rowCount = 0
			colCount = 0

			for row in player_reader:
				rowCount += 1
				if rowCount != 1 and rowCount < 1000:

					id_num = row[0]
					first_name = name_tools.split(row[2])[1]
					last_name = name_tools.split(row[2])[2]

					club_name = row[3]
					league_name = row[4]
					try:
						league_first_word = league_name.split()[0]
					except:
						print('league name split error')

					league_country = ""
					with open('ciftkale/demonyms.csv', 'r') as demonyms:
						demonym_reader = csv.reader(demonyms, delimiter=',', quotechar='|')
						for nat_row in demonym_reader:
							if league_first_word == nat_row[0]:
								league_country = nat_row[1]
								break


					date_of_birth = row[5]

					dominant_foot = row[12].lower()
					shot_accuracy = float(row[11])/100
					overall_score = row[10]
					salary = row[9]
					nationality = row [8]
					weight = row[7]
					height = row[6]


					last_name_without_spaces = last_name.replace(" ", "")
					username = last_name_without_spaces + id_num
					kit_number = randomKitNumber[rowCount%100-1]

					e_mail = username + "@football.com"
					hashed_password = "123456"
					phone_number = str(uniqueRandomNum[rowCount])

					logo_photo = 'photo' + str(uniqueRandomNum[rowCount])
					stadium = 'stadium' + str(uniqueRandomNum[rowCount])

					#print(first_name + " ... " + last_name + " ... " +  e_mail + " ... " +  username + " ... " + hashed_password + " ... " + phone_number)
					try:
						#cursor.execute("INSERT INTO person (first_name, last_name, e_mail, username, hashed_password, phone_number) VALUES (%s, %s, %s, %s, %s, %s)", [first_name, last_name, e_mail, username, hashed_password, phone_number])
						#cursor.execute("INSERT INTO sportsman (sportsman_username, date_of_birth, salary) VALUES (%s, TIMESTAMP %s, %s)", [username, date_of_birth, salary])
						#cursor.execute("INSERT INTO player (player_username, kit_number, weight, height, dominant_foot,shot_accuracy, overall_score, nationality) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", [username, kit_number, weight, height, dominant_foot, shot_accuracy, overall_score, nationality])
						
						#cursor.execute("INSERT INTO league (league_name, league_start, league_end) VALUES (%s, %s, %s)", [league_name, league_start, league_end])
						#cursor.execute("INSERT INTO leagueCountry (league_name, league_country) VALUES (%s, %s)", [league_name, league_country])
						#cursor.execute("INSERT INTO club (club_name, short_name, logo_photo, since, budget, value, stadium, country, league_name, league_start, standing) VALUES (%s, %s, %s, TIMESTAMP %s, %s, %s, %s, %s, %s, TIMESTAMP %s, %s)", [club_name, 'ABC', logo_photo, '1900-01-01', '1000000', '10000000', stadium, league_country, league_name, league_start, "0"])
						#cursor.execute("INSERT INTO worksFor (sportsman_username, club_name, start_date, end_date) VALUES (%s, %s, TIMESTAMP %s, TIMESTAMP %s)", [username, club_name, '1900-01-01', '1999-12-31'])

						print('\n\n\n\nsuccess\n\n\n\n')
					except DatabaseError :
						print('failed to insert' )
						#raise
						
						

					print('\n')



with connection.cursor() as cursor:
	


#inserter()
	
