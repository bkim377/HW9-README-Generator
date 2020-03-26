// defines all necessary global variables to make node index.js work as intended
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

// list of questions to ask the user
const questions = [
  "Enter your GitHub username:",
  "What license will you use?",
  "What is your project's name?",
  "What is your project's description?",
  "What is the table of contents?",
  "What are the install instructions?",
  "What is the usage?",
  "Who is contributing to this project?",
  "What tests are included?",
  "List the questions for this project:"
];

// the inquirer prompt that asks the questions listed above
inquirer
  .prompt([
    { type: "input", 
    message: questions[0], 
    name: "username" },
    { type: "list",
      message: questions[1],
      name: "license",
      choices: ["MIT", "Mozilla", "GNU", "Apache", "Boost", "Unlicense"]
    },
    { type: "input", 
      message: questions[2], 
      name: "projectName" },
    { type: "input", 
      message: questions[3], 
      name: "projectDescription" },
    {
      type: "input",
      message: questions[4],
      name: "tableOfContents",
      default: `*Project Name\n *Description\n *Install Instructions\n *Usage\n *Contributors\n *Tests\n *Questions`
    },
    { type: "input",
      message: questions[5],
      name: "installInstructions",
      default: "Run npm install in correct directory"
    },
    { type: "input",
      message: questions[6],
      name: "usage",
      default: "follow directions above"
    },
    { type: "input",
      message: questions[7],
      name: "contributors",
      default: "None"
    },
    { type: "input", 
    message: questions[8], 
    name: "tests", 
    default: "None" },
    { type: "input", 
    message: questions[9], 
    name: "questions", 
    default: "None" }
  ])
  .then(response => {
    const queryURL = `https://api.github.com/users/${response.username}`;
    axios.get(queryURL).then(function(res) {
      console.log(res.data);
      const fileContent = 
      `<h1>Project Name: ${response.projectName}</h1>
      <hr></hr>
      <h3>Project Description: </h3><p>${response.projectDescription}</p>
      <h3>Table of Contents: </h3><ol>${response.tableOfContents}</ol>
      <h3>Installation Instructions: </h3><p>${response.installInstructions}</p>
      <h3>Usage: </h3><p>${response.usage}</p>
      <h3>Contributing Users: </h3><p>${response.contributors}</p>
      <h3>Tests: </h3><p>${response.tests}</p>
      <h3>Questions: </h3><p>${response.questions}</p>
      <h2>Creator's Email: </h2><p>${res.data.email}</p>
      <h2>Creator's Picture: </h2><img src=${res.data.avatar_url} alt="User Profile Pic"></img>
      `

      fs.appendFile("READMEgen.md", fileContent, function(err) {
        if (err) {
          throw err;
        }
        console.log("Successfully written your README file");
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  });


// function writeToFile(fileName, data) {}

// function init() {}

// init();
