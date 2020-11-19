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
        "Update Employee Role",
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
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
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
  let query = `SELECT r.id, r.title, r.salary, r.department_id
  FROM roles AS r
  LEFT JOIN department AS d
  ON r.department_id = d.id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewDepartments() {
  let query = `SELECT d.id, d.department_name, r.salary
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
      var newEmployeeData = {
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: 1,
      };

      connection.query(
        `INSERT INTO employees SET ?`,
        newEmployeeData,
        function (err, res) {
          console.log("Success!");
          viewEmployees();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the department name?",
      }
    ])
    .then(function (answers) {
      console.log(answers);
      var newDepartmentData = {
        department_name: answers.department,
      };

      connection.query(
        `INSERT INTO department SET ?`,
        newDepartmentData,
        function (err, res) {
          if (err) throw err;
          console.log("Success!");
          viewDepartments();
        }
      );
    });
};

function addRole(){
  inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the role's title?",
    },
    {
      type: "input",
      name: "salary",
      message: "How much does this role make?",
    }
  ])
  .then(function (answers) {
    console.log(answers);
    var newRoleData = {
      title: answers.title,
      salary:answers.salary,
      department_id: 4
    };

    connection.query(
      `INSERT INTO roles SET ?`,
      newRoleData,
      function (err, res) {
        if (err) throw err;
        console.log("Success!");
        viewRoles();
      }
    );
  });
};

function updateEmployeeRole() {
  connection.query(`SELECT employees.last_name, roles.title 
                    FROM employees 
                    JOIN roles 
                    ON employees.role_id = roles.id`, function(err, res) {
  // console.log(res)
   if (err) throw err
   console.log(res)
  inquirer.prompt([
        {
          name: "lastName",
          type: "list",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the Employee's last name? ",
        },
        {
          name: "role",
          type: "input",
          message: "What is the Employees new title? ",
        },
    ]).then(function(res) {
      connection.query("UPDATE employee SET WHERE ?", 
      {
        last_name: res.lastName
     
      }, 
      function(err){
          if (err) throw err
          console.table(res)
          viewEmployees()
      })

  });
});

}