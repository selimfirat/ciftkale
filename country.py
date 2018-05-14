import csv

#country name to country code mapper

def country(country_name):
	with open('ciftkale/country_codes.csv', 'r') as countries:
		country_reader = csv.reader(countries, delimiter=',', quotechar='|')

		for row in country_reader:
			if country_name == row[0]:
				return row[1]
