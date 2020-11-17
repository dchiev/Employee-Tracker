DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- Employee Table --
CREATE TABLE employees  (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY (id)
);

-- Role Table --
CREATE TABLE roles  (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- Depatment Table --
CREATE TABLE department  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);


-- Insert a set of records.
