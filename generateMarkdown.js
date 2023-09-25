// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  switch (license) {
    case 'MIT':
      return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    case 'Apache 2.0':
      return '![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    case 'GPLv3':
      return '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
    case 'None':
      return 'This Project is not covered by a License at this time.'; // No badge for "None"
    default:
      return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch (license) {
    case 'MIT':
      return '[License Details](https://opensource.org/licenses/MIT)';
    case 'Apache 2.0':
      return '[License Details](https://www.apache.org/licenses/LICENSE-2.0)';
    case 'GPLv3':
      return '[License Details](https://www.gnu.org/licenses/gpl-3.0)';
    case 'None':
      return ''; // No license link for "None"
    default:
      return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    const badge = renderLicenseBadge(license);
    const link = renderLicenseLink(license);
    return `
## License

${badge}

This project is licensed under the [${license} License](${link}).
`;
  }
  return '';
}

function renderContributionSection(answers) { // Pass 'answers' as an argument
  let contributionSection = '';
  if (answers.contribution === 'Default Guidelines') {
    // Include default contribution guidelines
    contributionSection = `
## Contributing

Contributions to this project are welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they are well-tested.
4. Create a pull request with a clear description of your changes.
5. Your pull request will be reviewed, and upon approval, it will be merged into the main branch.

Please follow our [Contributor Covenant](link-to-contributor-covenant) when contributing.
`;
  } else if (answers.contribution === 'Custom Guidelines' && answers.customContribution) {
    // Include custom contribution guidelines entered by the user
    contributionSection = `
    ## Contributing

${answers.customContribution}
`;
  }
  return contributionSection; // Return the contribution section
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = (answers) =>
  `# ${answers.title} ${renderLicenseBadge(answers.license)}

## Description

- ${answers.motivation}
- ${answers.why}
- ${answers.problem}
- ${answers.learn}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Screenshots

${answers.screenshots.map(path => `![Screenshot](${path})`).join('\n')}

${renderLicenseSection(answers.license)}

${renderContributionSection(answers)}

## Tests

${answers.tests}

## Questions
Github: ${answers.github}
[Github Profile](https://www.github.com/${answers.github})\n
If you have any questions please contact me at ${answers.email}.\n
`;

module.exports = generateMarkdown;
