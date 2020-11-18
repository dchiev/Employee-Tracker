DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- Employee Table --
CREATE TABLE employees  (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

-- Role Table --
CREATE TABLE roles  (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id) 
);

-- Depatment Table --
CREATE TABLE department  (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Initial Values for Employee -- 
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Luke", "Skywalker", null, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Han", "Solo", null, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Leia", "Organa", null, 3);

-- Initial Values for Department -- 
INSERT INTO department (name)
VALUE ("Information Technology");
INSERT INTO department (name)
VALUE ("Human Resources");
INSERT INTO department (name)
VALUE ("Creative");


-- Initial Values for Roles -- 
INSERT INTO roles (title, salary, department_id)
VALUE ("IT Lead", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("HR Lead", 75000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Graphic Designer", 75000, 3);
