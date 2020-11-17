var mysql = require("mysql");
var inquirer = require("inquirer");

require('dotenv').config()

const password = process.env.DB_password

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "employee_DB"
  });

  connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id "+ connection.threadId + "\n");
})