import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
  { type: 'input', name: 'title', message: 'What is the title of your project?' },
  { type: 'input', name: 'description', message: 'Provide a short description of your project:' },
  { type: 'input', name: 'installation', message: 'What are the installation instructions?' },
  { type: 'input', name: 'usage', message: 'What is the usage information?' },
  { type: 'list', name: 'license', message: 'Choose a license:', choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None'] },
  { type: 'input', name: 'contributing', message: 'What are the contribution guidelines?' },
  { type: 'input', name: 'tests', message: 'What are the test instructions?' },
  { type: 'input', name: 'github', message: 'Enter your GitHub username:' },
  { type: 'input', name: 'email', message: 'Enter your email address:' },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`${fileName} has been generated!`);
    }
  });
}

function generateREADME(data) {
  return `
# ${data.title}

![License](https://img.shields.io/badge/license-${data.license}-blue.svg)

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
\`\`\`
${data.installation}
\`\`\`

## Usage
${data.usage}

## License
This project is licensed under the ${data.license} license.

## Contributing
${data.contributing}

## Tests
\`\`\`
${data.tests}
\`\`\`

## Questions
For any questions, please contact me:

- GitHub: [${data.github}](https://github.com/${data.github})
- Email: [${data.email}](mailto:${data.email})
`;
}

function init() {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile('README.md', readmeContent);
  });
}

init();
