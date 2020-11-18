
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_password,
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});



function start() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "start",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Roles",
        "Exit",
      ],
    })
    .then(function (result) {
      console.log(result.start);

      switch (result.start) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Exit":
          console.log("You've Exit the application!");
          connection.end();
      }
    });
}

function viewEmployees() {
  let query = `SELECT e.id,
               CONCAT (e.first_name," ", e.last_name) AS "Full Name",
              r.salary, 
              r.title, 
              IF (CONCAT (e2.first_name," ", e2.last_name) IS NULL, "No Manager",CONCAT (e2.first_name," ", e2.last_name) ) AS "Manager Name" 
               FROM employees AS e
               LEFT JOIN roles AS r
               ON e.role_id = r.id 
               LEFT JOIN employees AS e2
               ON e.manager_id = e2.id `;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRoles() {
  let query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewDepartments() {
  let query = `SELECT d.id, d.name, r.salary
              FROM department AS d
              LEFT JOIN roles AS r
              ON d.id = r.department_id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's job title?",
        choices: ["IT Lead", "HR Lead", "Graphic Designer"],
      },
    ])
    .then(function (answers) {
      console.log(answers);
      var role;
      switch
      role=1:
      var newEmployeeData = {
        "first_name": answers.firstName,
        "last_name": answers.lastName,
        "role_id": role
      };
      
      connection.query(`INSERT INTO employees SET ?`, newEmployeeData, function (err, res) {
        console.log("Success!");
        start();
    ;
    });
})};

//determine department ID with switch case 