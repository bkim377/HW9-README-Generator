var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

const questions = [
  "Enter your GitHub username:",
  "What is your preferred badge label?",
  "What would you like your badge to say?",
  "What is your project's name?",
  "What is your project's description?",
  "What is the table of contents?",
  "What are the installation instructions?",
  "What is the usage?",
  "What license will you use?",
  "Who is contributing to this project?",
  "What tests are included?",
  "List the questions for this project:"
];

inquirer.prompt({
    message: questions[0],
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    axios.get(queryUrl).then(function(res) {
        const {name} = res.data; 
        console.log(name);
        

        // const realNameString = realName.join("\n");

        // fs.writeFile("test.html", realNameString, function(err) {
        //   if (err) {
        //     throw err;
        //   }
        //   console.log(realName);
        // })
      })
      .catch(function(err) {
        console.log(err);
      });

  });




//   ([
//   {
//     type: "input",
//     message: questions[1],
//     name: "badgeLabel"
//   },
//   {
//     type: "input",
//     message: questions[2],
//     name: "badgeContent" 
//   },
//   {
//     type: "input",
//     message: questions[3],
//     name: "projectName"
//   },
//   {
//     type: "input",
//     message: questions[4],
//     name: "projectDescription"
//   },
//   {
//     type: "input",
//     message: questions[5],
//     name: "tableOfContents"
//   },
//   {
//     type: "input",
//     message: questions[6],
//     name: "installation"
//   },
//   {
//     type: "input",
//     message: questions[7],
//     name: "usage"
//   },
//   {
//     type: "input",
//     message: questions[8],
//     name: "license"
//   },
//   {
//     type: "input",
//     message: questions[9],
//     name: "contributors"
//   },
//   {
//     type: "input",
//     message: questions[10],
//     name: "tests"
//   },
//   {
//     type: "input",
//     message: questions[11],
//     name: "questions"
//   },
// ]);

function writeToFile(fileName, data) {}

function init() {}

// init();
