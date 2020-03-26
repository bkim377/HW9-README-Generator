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
    { type: "input", message: questions[0], name: "username" },
    {
      type: "list",
      message: questions[1],
      name: "license",
      choices: ["MIT", "Mozilla", "GNU", "Apache", "Boost", "Unlicense"]
    },
    { type: "input", message: questions[2], name: "projectName" },
    { type: "input", message: questions[3], name: "projectDescription" },
    {
      type: "input",
      message: questions[4],
      name: "tableOfContents",
      default: `*Project Name\n *Description\n *Install Instructions\n *Usage\n *Contributors\n *Tests\n *Questions`
    },
    {
      type: "input",
      message: questions[5],
      name: "installInstructions",
      default: "Run npm install in correct directory"
    },
    {
      type: "input",
      message: questions[6],
      name: "usage",
      default: "follow directions above"
    },
    {
      type: "input",
      message: questions[7],
      name: "contributors",
      default: "None"
    },
    { type: "input", message: questions[8], name: "tests", default: "None" },
    { type: "input", message: questions[9], name: "questions", default: "None" }
  ])
  .then(response => {
    const queryURL = `https://api.github.com/users/${response.username}`;
    axios.get(queryURL).then(function(res) {
      console.log(res.data);
      const {avatar_url} = res.data;
      // const profilePic = window.print(avatar_url);

      fs.writeFile("READMEgen.md", avatar_url + "\n", function(err) {
        if (err) {
          throw err;
        }
        console.log(avatar_url);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  });
// },
//
// })
// .then(function({ username }) {
//   const queryUrl = `https://api.github.com/users/${username}`;

//   axios.get(queryUrl).then(function(res) {
      
//       fs.appendFile("READMEgen.md", email, function(err) {
//         if (err) {
//           throw err;
//         }
//         console.log(email);
//       });
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//     });

// message: questions[1],
// name: "badgeLabel"
//   ([

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

// function writeToFile(fileName, data) {}

// function init() {}

// init();
