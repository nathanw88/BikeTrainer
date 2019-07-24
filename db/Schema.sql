CREATE DATABASE IF NOT EXISTS trainer_db;
USE trainer_db;

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userEmail VARCHAR(255) NOT NULL UNIQUE,
    userPassword LONGTEXT,
    userBirthday VARCHAR(11),
    PRIMARY KEY (id)
);


CREATE TABLE biking (
	fk_user INT(11) not null,
	id INT(11) NOT NULL AUTO_INCREMENT,
    difficulty INT(55),
    distance_miles INT(255),
    duration_minutes INT(255),
    avg_heartbeat INT(11),
    max_heartbeat INT(11),
    workout_type VARCHAR(55),
    avg_mph INT(55), 
    date DATETIME(6),
    
    FOREIGN KEY (fk_user) REFERENCES users (id),
    PRIMARY KEY (id)
);

CREATE TABLE running (
	fk_user INT(11) not null,
	id INT(11) NOT NULL AUTO_INCREMENT,
    difficulty INT(55),
    distance_miles INT(255),
    duration_minutes INT(255),
    avg_heartbeat INT(11),
    max_heartbeat INT(11),
    workout_type VARCHAR(55),
    avg_mph INT(55), 
    date DATETIME(6),
    
    FOREIGN KEY (fk_user) REFERENCES users (id),
    PRIMARY KEY (id)
);

CREATE TABLE sleeping (
	fk_user INT(11) NOT NULL,
    id INT(11) NOT NULL AUTO_INCREMENT,
    laid_down TIME(6),
    asleep TIME(6),
    got_up TIME(6),
    awake TIME(6),
    waking_heartbeat INT(11),
    date DATE,
    
	FOREIGN KEY (fk_user) REFERENCES users (id),
    PRIMARY KEY (id)
    );
   
CREATE TABLE food (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
    );
   
CREATE TABLE nutrient (
	fk_user INT(11) NOT NULL,
    fk_food INT(11) NOT NULL,
	id INT(11) NOT NULL AUTO_INCREMENT,
	value INT(11),
    nutrient_id INT(11),
    date DATE,
    time TIME(6),
    grouping VARCHAR(11),
    name VARCHAR(11),
    unit VARCHAR(11),
    
	FOREIGN KEY (fk_user) REFERENCES users (id),
    FOREIGN KEY (fk_food) REFERENCES food (id),
    PRIMARY KEY (id)
    );


    CREATE TABLE
