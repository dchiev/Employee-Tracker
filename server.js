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
})

/* function start() {
    inquirer.prompt({

    })
} */