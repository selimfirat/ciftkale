CREATE TABLE Person(
username VARCHAR(32) PRIMARY KEY,
photo VARCHAR(32),
first_name VARCHAR(32) NOT NULL,
last_name VARCHAR(32) NOT NULL, hashed_password CHAR(60) NOT NULL,
e_mail VARCHAR(32) NOT NULL UNIQUE, phone_number VARCHAR(16) UNIQUE, date_of_registration TIMESTAMP DEFAULT now()
);

CREATE TABLE Agent(
agent_username VARCHAR(32) PRIMARY KEY,
FOREIGN KEY (agent_username) REFERENCES Person(username)
);


CREATE TABLE Sportsman(
sportsman_username VARCHAR(32) PRIMARY KEY,
date_of_birth DATE NOT NULL,
salary INT NOT NULL,
FOREIGN KEY (sportsman_username) REFERENCES Person(username)
);

CREATE TYPE position_t AS ENUM('GK', 'CB', 'LCB', 'RCB', 'LB', 'RB', 'CM', 'LDM', 'RDM', 'CDM', 'CAM', 'LM', 'RM', 'ST', 'CF', 'LW', 'RW');
CREATE TYPE foot_t AS ENUM('left', 'right');
CREATE TABLE Player(
player_username VARCHAR(32) PRIMARY KEY,
position position_t,
kit_number SMALLINT,
weight SMALLINT,
height SMALLINT,
dominant_foot foot_t,
shot_accuracy REAL CONSTRAINT percentage_real CHECK (shot_accuracy >= 0 AND
shot_accuracy <= 1),
overall_score INT CONSTRAINT percentage_int CHECK (overall_score >= 0 AND
overall_score <= 100),
nationality VARCHAR(32) NOT NULL,
agent_username VARCHAR(32),
FOREIGN KEY (player_username) REFERENCES Sportsman(sportsman_username), FOREIGN KEY (agent_username) REFERENCES Agent(agent_username)
);

CREATE TABLE Coach(
coach_username VARCHAR(32) PRIMARY KEY,
experience SMALLINT,
FOREIGN KEY (coach_username) REFERENCES Sportsman(sportsman_username)
);

CREATE TABLE Director(
director_username VARCHAR(32) PRIMARY KEY, FOREIGN KEY (director_username) REFERENCES
Sportsman(sportsman_username) );

CREATE TYPE status_t AS ENUM('pending', 'accepted', 'rejected', 'cancelled'); CREATE TABLE Offer(
offer_id SERIAL,
date DATE NOT NULL,
price INT NOT NULL,
status status_t NOT NULL,
director_sender VARCHAR(32) NOT NULL,
director_receiver VARCHAR(32) NOT NULL,
PRIMARY KEY (offer_id),
FOREIGN KEY (director_receiver) REFERENCES Director(director_username), FOREIGN KEY (director_sender) REFERENCES Director(director_username), CHECK (director_sender <> director_receiver)
);

CREATE TABLE Bucket(
offer_id INT NOT NULL,
player_username VARCHAR(32) NOT NULL,
PRIMARY KEY (offer_id, player_username),
FOREIGN KEY (player_username) REFERENCES Player
); 


CREATE TABLE League(
league_name VARCHAR(32) NOT NULL UNIQUE, league_start DATE NOT NULL,
league_end DATE NOT NULL,
UNIQUE (league_name, league_end),
PRIMARY KEY (league_name, league_start)
);

CREATE TABLE LeagueCountry(
league_name VARCHAR(32) NOT NULL, league_country VARCHAR(32) NOT NULL, PRIMARY KEY (league_name)
);

CREATE TABLE Club(
club_name VARCHAR(32) PRIMARY KEY,
short_name VARCHAR(8) NOT NULL,
logo_photo VARCHAR(32) NOT NULL UNIQUE,
since DATE NOT NULL,
budget INT NOT NULL,
value INT NOT NULL,
stadium VARCHAR(32) NOT NULL UNIQUE,
country VARCHAR(32) NOT NULL,
league_name VARCHAR(32) NOT NULL,
league_start DATE NOT NULL,
standing INT NOT NULL,
FOREIGN KEY (league_name, league_start) REFERENCES League
);

CREATE TABLE WorksFor(
sportsman_username VARCHAR(32) NOT NULL,
club_name VARCHAR(32) NOT NULL,
start_date DATE NOT NULL,
end_date DATE,
PRIMARY KEY (sportsman_username, club_name, start_date), UNIQUE (sportsman_username, club_name, end_date), FOREIGN KEY (sportsman_username) REFERENCES Sportsman, FOREIGN KEY (club_name) REFERENCES Club
);

CREATE TABLE LeagueSponsor(
sponsor_name VARCHAR(32) NOT NULL,
league_name VARCHAR(32) NOT NULL,
league_start DATE NOT NULL,
PRIMARY KEY (sponsor_name, league_name, league_start), FOREIGN KEY (league_name, league_start) REFERENCES League
);

CREATE TABLE ClubSponsor(
sponsor_name VARCHAR(32) NOT NULL, club_name VARCHAR(32) NOT NULL, PRIMARY KEY (sponsor_name, club_name), FOREIGN KEY (club_name) REFERENCES Club
);

CREATE TABLE Match(
datetime TIMESTAMP NOT NULL,
stadium VARCHAR(32) NOT NULL, overtime SMALLINT NOT NULL, referee VARCHAR(32) NOT NULL, home_goals SMALLINT NOT NULL, away_goals SMALLINT NOT NULL, home VARCHAR(32) NOT NULL, away VARCHAR(32) NOT NULL, league_name VARCHAR(32), league_start DATE,
PRIMARY KEY (datetime, stadium),
UNIQUE (datetime, referee),
UNIQUE (datetime, home, away),
FOREIGN KEY (home) REFERENCES Club(club_name),
FOREIGN KEY (away) REFERENCES Club(club_name),
FOREIGN KEY (league_name, league_start) REFERENCES League, CHECK (home <> away) );

CREATE TYPE stat_t AS ENUM('goal', 'shot', 'assist', 'save', 'own_goal', 'penalty', 'freekick', 'corner', 'red_card', 'yellow_card');
CREATE TABLE Stat(
player_username VARCHAR(32) NOT NULL, time TIMESTAMP NOT NULL,
description stat_t NOT NULL,
match_time TIMESTAMP NOT NULL, stadium VARCHAR(32) NOT NULL,
PRIMARY KEY (player_username, time),
FOREIGN KEY (player_username) REFERENCES Player(player_username), FOREIGN KEY (match_time, stadium) REFERENCES Match(datetime, stadium)
);
