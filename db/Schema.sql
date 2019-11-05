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
  
CREATE TABLE error_log (
	fk_user INT(11) NOT NULL,
    fk_food INT(11) NOT NULL,
	id INT(11) NOT NULL AUTO_INCREMENT,
	value INT(11),
    nutrient_id INT(11),
    date DATE,
    time TIME(6),
    grouping VARCHAR(255),
    name VARCHAR(255),
    unit VARCHAR(11),
    
	FOREIGN KEY (fk_user) REFERENCES users (id),
    FOREIGN KEY (fk_food) REFERENCES food (id),
    PRIMARY KEY (id)
    );

CREATE TABLE Protein (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );

CREATE TABLE Total_Lipids (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Carbohydrate_By_Difference (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Ash (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Energy (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Starch (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Sucrose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Glucose_Dextrose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Fructose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Lactose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Maltose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Ethyl_Alcohol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Water (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Adjusted_Protein (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Caffeine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Theobromine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Sugar (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Galactose (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Dietary_Fiber (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Calcium (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Iron (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Magnesium (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Phosphorus (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Potassium (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Sodium (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Zinc (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Copper (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Fluoride (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Manganese (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Selenium (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_A (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Retinol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE RAE_Vitamin_A (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Beta_Carotene (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Alpha_Carotene (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_E (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_D (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_D2 (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_D3 (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_D2_D3_ (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Beta_Cryptoxathin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Lycopene (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Lutein_Zeacanthin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Beta_Tocopherol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Gamma_Tocopherol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Delta_Tocopherol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Alpha_Tocotrienol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Beta_Tocotrienol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Gamma_Tocotrienol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Delta_Tocotrienol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_C (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Thiamin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Riboflavin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Niacin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Pantothenic_Acid (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_B₆ (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Folate_Total (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_B₁₂ (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Choline (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Menaquinone_4 (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Dihydrophylloquinone (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_K (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Folic_Acid (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Food_Folate (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE DFE_Folate (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Betaine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Tryptophan (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Theonine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Isoleucine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Leucine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Lysine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Methionine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Cystine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Phenylalanine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Tyrosine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Valine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Arginine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Histidine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Alanine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Aspartic_Acid (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Glutamic_Acid (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Glycine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Proline (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Serine (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Hydroxyproline (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE added_Vitamin_E (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Sugars_added (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Vitamin_E_added (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE added_Vitamin_B₁₂ (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Cholesterol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Trans (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Saturated (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{4:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{6:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{8:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{10:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{12:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{14:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{16:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:1_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:3_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:4_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:6_n-3_(DHA)}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{14:1}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{16:1_Indifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:4}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:1}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:5_n-3_(EPA)}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:1_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:5_n-3_(DPA)}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Phytosterols (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Stigmasterol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Campesterol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `Beta-Sitosterol` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Monounsaturated (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Polyunsaturated (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{15:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{17:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{24:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{16:1_t}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:1_t}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:1_t}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_t}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_i}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_t,t}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_CLAs}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{24:1_c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:2_n-6_c,c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{16:1_c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:1_c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:2_n-6_c,c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:1_c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:3_n-6_c,c,c}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{17:1}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:3_Undifferentiated}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Transmonoenoic (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Transpolyenoic (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{13:0}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{15:1}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Daidzein (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Genistein (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Total_Isoflavones (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Biochanin_A (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Cyanidin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Proanthocyanidin_dimers (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Proanthocyanidin_trimers (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `Proanthocyanidin_4-6mers` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `Proanthocyanidin_7-10mers` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `Proanthocyanidin_polymers_(>10mers)` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Petunidin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Delphinidin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Malvidin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Peonidin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `(+)-Catechin` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `(-)-Epigallocatechin` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `(-)-Epicatechin` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `(-)-Epigallocatechin_3-gallate` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Naringenin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Apigenin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Luteolin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Isorhamnetin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Kaempferol (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Myricetin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE Quercetin (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `(+)-Gallocatechin` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:3_n-3_c,c,c_(ALA)}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:3_n-3}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:3_n-6}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{20:4_n-6}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:3i}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{21:5}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{22:4}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );
        
CREATE TABLE `{18:1-11_t_(18:1t_n-7)}` (
      fk_user INT(11) NOT NULL,
        fk_food INT(11) NOT NULL,
      id INT(11) NOT NULL AUTO_INCREMENT,
      value INT(11),
        nutrient_id INT(11),
        date DATE,
        time TIME(6),
        grouping VARCHAR(255),
        name VARCHAR(255),
        unit VARCHAR(11),
        
      FOREIGN KEY (fk_user) REFERENCES users (id),
        FOREIGN KEY (fk_food) REFERENCES food (id),
        PRIMARY KEY (id)
        );