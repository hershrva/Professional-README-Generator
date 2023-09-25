// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;
const generateMarkdown = require('./generateMarkdown');
// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
      {
        type: 'input',
        name: 'motivation',
        message: 'What was your motivation for the project?',
      },
      {
        type: 'input',
        name: 'why',
        message: 'Why did you build this project?',
      },
      {
        type: 'input',
        name: 'problem',
        message: 'What problem does it solve?',
      },
      {
        type: 'input',
        name: 'learn',
        message: 'What did you learn?',
      },
      {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use.',
      },
      {
        type: 'input',
        name: 'screenshots',
        message: 'Include file paths to screenshots as needed (comma-separated):',
        filter: function (value) {
          // Ensure value is a string and then split it into an array
          if (typeof value === 'string') {
            return value.split(',').map(path => path.trim());
          }
          return [];
        },
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPLv3', 'None'],
        validate: function (value) {
          if (['MIT', 'Apache 2.0', 'GPLv3', 'None'].includes(value)) {
            return true;
          } else {
            return 'Please choose a valid license option.';
          }
        },
      },
      {
      type: 'list',
      name: 'contribution',
      message: 'Choose contribution guidelines for your project:',
      choices: ['Default Guidelines', 'Custom Guidelines'],
      },
      {
      type: 'input',
      name: 'customContribution',
      message: 'Enter your custom contribution guidelines:',
      when: (answers) => answers.customContribution === 'Custom Guidelines',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Please include any tests you have for your application.',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email.',
      },
    ]);
  };
// TODO: Create a function to write README file
const init = () => {
    promptUser()
      .then((answers) => {
        // Process and format screenshot paths here
        const screenshotPaths = answers.screenshots;
        const screenshotMarkdown = screenshotPaths
          .map(path => `![Screenshot](${path.trim()})`)
          .join('\n');
  
        // Combine user answers and screenshotMarkdown into the README content
        answers.screenshotMarkdown = screenshotMarkdown;
  
        // Generate README and write it to a file
        const readmeContent = generateMarkdown(answers);
        return writeFile('newREADME.md', readmeContent);
      })
      .then(() => console.log('Successfully wrote to newREADME.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
