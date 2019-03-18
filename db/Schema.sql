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
	fk_user INT(11) NOT NULL,
	id INT(11) NOT NULL AUTO_INCREMENT,
	carbs INT(11),
    fats INT(11),
    proteins INT(11),
    date DATETIME(6),
    
	FOREIGN KEY (fk_user) REFERENCES users (id),
    PRIMARY KEY (id)
    );
