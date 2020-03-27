// defines all necessary global variables to make node index.js work as intended
var inquirer = require("inquirer");
var axios = require("axios");
var fs = require("fs");

// list of questionList to ask the user
const questionList = [
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

// the inquirer prompt that asks the questionList listed above
inquirer
  .prompt([
    { type: "input", message: questionList[0], name: "username" },
    {
      type: "list",
      message: questionList[1],
      name: "license",
      choices: ["MIT", "Mozilla", "GNU", "Apache", "Boost", "Unlicense"]
    },
    { type: "input", message: questionList[2], name: "projectName" },
    { type: "input", message: questionList[3], name: "projectDescription" },
    {
      type: "input",
      message: questionList[4],
      name: "tableOfContents",
      default: `\n
      1. Project Name\n
      2. Description\n
      3. Install Instructions\n
      4. Usage\n
      5. Contributors\n
      6. Tests\n
      7. Questions\n`
    },
    {
      type: "input",
      message: questionList[5],
      name: "installInstructions",
      default: "Run npm install in correct directory"
    },
    {
      type: "input",
      message: questionList[6],
      name: "usage",
      default:
        "Follow directions above, then clone the repo and test it yourself"
    },
    {
      type: "input",
      message: questionList[7],
      name: "contributors",
      default: "None"
    },
    { type: "input", message: questionList[8], name: "tests", default: "None" },
    {
      type: "input",
      message: questionList[9],
      name: "questionList",
      default: "None"
    }
  ])
  .then(response => {
    const queryURL = `https://api.github.com/users/${response.username}`;
    axios
      .get(queryURL)
      .then(function(res) {
        // console.log(res.data);
        const fileContent = `
# Project Name: ${response.projectName} \n

<img src="https://img.shields.io/static/v1?label=License&message=${response.license}&color=blue" alt="Badge for License"></img>
      
<img src="giphy-readme-maker.gif" alt="GIF of index.js"></img>

<hr>

### Project Description:\n
<p>${response.projectDescription}</p>\n
      
### Table of Contents:
<ol>${response.tableOfContents}</ol>

### Installation Instructions:\n
<p>${response.installInstructions}</p>\n

### Usage:\n
<p>${response.usage}</p>\n
      
### Contributing Users:\n
<p>${response.contributors}</p>\n

### Tests:\n
<p>${response.tests}</p>\n

### Questions:\n
<p>${response.questionList}</p>\n
      
## Creator's Picture:\n
<img src="${res.data.avatar_url}" alt="User Profile Pic"></img>
`;

        fs.writeFile("README.md", fileContent, function(err) {
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
