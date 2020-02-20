CREATE DATABASE IF NOT EXISTS trainer_db;
USE trainer_db;

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    userEmail VARCHAR(255) NOT NULL UNIQUE,
    userPassword LONGTEXT,
    userBirthday VARCHAR(11),
    PRIMARY KEY (id)
);

CREATE TABLE food (
	id INT(11) NOT NULL,
    description LONGTEXT,
    gtin VARCHAR(255),
    brand VARCHAR(255),
    additional_description LONGTEXT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

ALTER TABLE food ADD FULLTEXT(description, gtin, brand, additional_description, name);

CREATE TABLE nutrient (
	id INT(11) NOT NULL,
    name VARCHAR(255),
    unit VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE nutrition_plan (
    id INT(11) NOT NULL AUTO_INCREMENT,
    fk_user INT(11),
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES users (id),
    PRIMARY KEY (id)

);

CREATE TABLE nutrition_plan_nutrients (
    id INT(11) NTO NULL AUTO_INCREMENT,
    fk_nutrient INT(11) NOT NULL,
    amount INT(11) NOT NULL,
    age INT(11),
    fk_nutrition_plan INT(11) NOT NULL,
    max_amount INT(11),
    FOREIGN KEY (fk_nutrition_plan) REFERENCES nutrition_plan (id),
    FOREIGN KEY (fk_nutrient) REFERENCES nutrient (id),
    PRIMARY KEY (id)
);


CREATE TABLE food_nutrient (
	id INT(11) NOT NULL,
    fk_food INT(11),
    fk_nutrient INT(11) NOT NULL,
    amount INT(11) NOT NULL,
    FOREIGN KEY (fk_food) REFERENCES food (id),
    FOREIGN KEY (fk_nutrient) REFERENCES nutrient (id),
    PRIMARY KEY (id)
    
);

CREATE TABLE food_portion (
	id INT(11) NOT NULL,
    fk_food INT(11) NOT NULL,
    seq_num INT(11),
    amount INT(11),
    unit VARCHAR(255),
    description LONGTEXT,
    gram_weight INT(11),
    FOREIGN KEY (fk_food) REFERENCES food (id),
    PRIMARY KEY (id)
);

CREATE TABLE user_nutrient (
	id INT(11) NOT NULL AUTO_INCREMENT,
    fk_user INT(11) NOT NULL,
    fk_nutrient INT(11) NOT NULL,
    value DECIMAL(6, 3) NOT NULL,
    date DATETIME,
    FOREIGN KEY (fk_user) REFERENCES users (id),
    FOREIGN KEY (fk_nutrient) REFERENCES nutrient (id),
    PRIMARY KEY (id)
);

CREATE TABLE user_food (
	id INT(11) NOT NULL AUTO_INCREMENT,
    fk_user INT(11) NOT NULL,
    fk_food INT(11) NOT NULL,
    grams INT(11) NOT NULL,
    date DATETIME,
    FOREIGN KEY (fk_user) REFERENCES users (id),
    FOREIGN KEY (fk_food) REFERENCES food (id),
    PRIMARY KEY (id)	
);