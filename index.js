const connection = require('./config/connection');
const inquirer = require('inquirer');
const figlet = require('figlet');
const validate = require('./lib/validate');

// Database connect with figet title
console.log((`====================================================================================`));
console.log(``);
console.log((figlet.textSync('Employee Tracker')));
console.log(``);
console.log(`                                                          ` + ('by: l-antonello'));
console.log(``);
console.log((`====================================================================================`));

// Inquirer prompts
const promptUser = () => {
  inquirer.prompt([
    {
      name: 'choices',
      type: 'list',
      message: 'Please select an option:',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Employee Role',
        'Exit'
      ]
    }
  ])
  // View Employees, Roles, Departments
  .then(answers => {
    if (answers.choices === 'View All Employees') {
      connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
      });
      promptUser();
    }
    else if (answers.choices === 'View All Roles') {
      connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
      });
      promptUser();
    }
    else if (answers.choices === 'View All Departments') {
      connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
      });
      promptUser();
    }
    // Prompts for adding employee
    else if (answers.choices === 'Add Employee') {
      inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the first name of the employee',
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the last name of the employee',
        },
        {
          name: 'role_id',
          type: 'input',
          message: 'What is the id of the role',
        },
        {
          name: 'manager_id',
          type: 'input',
          message: 'What is the id of the manager for the employee',
        },
      ])
      // Add employee by name
      .then(employeeAnswers => {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeAnswers.first_name}', '${employeeAnswers.last_name}', ${employeeAnswers.role_id}, ${employeeAnswers.manager_id})`, (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        });
      });
    }
    // Prompts for adding department
    else if (answers.choices === 'Add Department') {
      inquirer.prompt([
        {
          name: 'department_name',
          type: 'list',
          message: 'Please select a department:',
          choices: [
            'Engineering',
            'Sales',
            'Finance',
            'Legal',
            'Marketing',
          ]
        }
      ])
      // Adds department
      .then(departmentAnswers => {
        connection.query(`INSERT INTO department (department_name) VALUES ('${departmentAnswers.department_name}')`, (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        });
      });
    }
        // Prompts for adding role
        else if (answers.choices === 'Add Role') {
          inquirer.prompt([
            {
              name: 'title',
              type: 'input',
              message: 'What is the title of the role',
            },
            {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of the role',
            },
            {
              name: 'department_id',
              type: 'input',
              message: 'What is the department of the role',
            },
          ])
                // Add role by name
      .then(roleAnswers => {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleAnswers .title}', '${roleAnswers .salary}', ${roleAnswers .department_id})`, (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        });
      })
    }
      // Prompt for Update Emplyee Role
      else if (answers.choices === 'Update Employee Role') {
        inquirer.prompt([
          {
            name: 'last_name',
            type: 'list',
            message: 'Please select a Name:',
            choices: [
              'Caesar',
              'Antony',
              'Ovid',
              'Virgil',
              'Cleopatra',
              'person'
            ]
          }
        ])  
    .then(roleAnswers =>{})
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?',[], (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        })
      }
    else {
      promptUser();
    }  
  });
};

promptUser();
