const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const validate = require('./lib/validate');

// Database Connect and Starter Title
// connection.connect((error) => {
//   if (error) throw error;
  console.log((`====================================================================================`));
  console.log(``);
  console.log((figlet.textSync('Employee Tracker')));
  console.log(``);
  console.log(`                                                          ` + ('by: l-antonello'));
  console.log(``);
  console.log((`====================================================================================`));
  // promptUser();
// });
