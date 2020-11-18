var mysql = require("mysql");
var inquirer = require("inquirer");

require('dotenv').config()

 

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_password,
    database: "employee_DB"
  });

  connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id "+ connection.threadId + "\n");
    viewDepartments();
})

 function start() {
    inquirer.prompt({
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
      ],
    })
};

function viewEmployees(){
  let query= "SELECT * FROM employees";
  connection.query(query,function(err,res){
    if (err) 
    throw err;
    console.table(res);
    start();
  });
};

function viewRoles(){
  let query = "SELECT * FROM roles";
  connection.query(query, function (err,res){
    if (err)
    throw err;
    console.table(res);
    start();
  });
};

function viewDepartments() {
  let query = "SELECT * FROM department";
  connection.query (query, function (err,res){
    if (err)
    throw err;
    console.table(res);
    start();
  });
};

/* function addEmployee () {
  let query = "INSERT INTO EMPLOYEES "
} */