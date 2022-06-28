const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'title_of_Project',
            message:'Type your Project Title:'
        },
    
        {
            type: 'input',
            name: 'description',
            message:'Describe your project in a nutshell:'
        },
    
        {
            type: 'input',
            name: 'installation',
            message:'How do you install your project?'
        },
    
        {
            type: 'input',
            name: 'usage',
            message:'What can you use your project for?'
        },
    
        {
            type: 'list',
            name: 'license',
            message:'Pick a license:',
            choices: [ "Apache License 2.0", "GNU General Public License v2.0","GNU General Public License v3.0","ISC License","MIT License"]
        },
    
        {
            type: 'input',
            name: 'contribution',
            message:'How did you contribute for the Project?'
        },
    
        {
            type: 'input',
            name: 'test',
            message:'Explain how to test the Project:'
        },
    
        {
            type: 'input',
            name: 'github',
            message:'Type Github username for Questions:'
        },
    
        {
            type: 'input',
            name: 'email',
            message:'Type email for Questions:'
        },
    ])
    .then((response) => {
    licensePicked (response)
    htmlRender(response)
    })

const htmlRender = (response) => {
    readMe = `# ${response.title_of_Project}
${licenseImg}
        
## Description
${response.description}
    
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribution](#contribution)
- [Test](#test)
- [Questions](#questions)
    
    
## Installation
${response.installation}.
## Usage
${response.usage}.
## License
${licenseDescription}.
## Contribution
${response.contribution}.
## Test 
${response.test}.
    
## Questions
For further question or any kind of issue, please visit https://github.com/${response.github}, or contact ${response.email}.`
    
const fs = require('fs');
fs.writeFile('README.md', readMe, (err) =>
err ? console.error(err) : console.log("Your Project has been created!")
);

}

let licenseDescription = "";
let licenseImg ="";

const licensePicked = (response) => {
    if (response.license === "Apache License 2.0"){
        licenseImg= "![license](https://img.shields.io/badge/license-Apache%20License%202.0-green)"
    } 

    if (response.license === "GNU General Public License v2.0"){
        licenseImg= "![license](https://img.shields.io/badge/license-GNU%20General%20Public%20License%20v2.0-green)"
    } 
    
    if (response.license === "GNU General Public License v3.0"){
        licenseImg= "![license](https://img.shields.io/badge/license-GNU%20General%20Public%20License%20v3.0-green)"
    } 
    
    if (response.license === "ISC License"){
        licenseImg= "![license](https://img.shields.io/badge/license-ISC%20license-green)"
    } 
    
    if (response.license === "MIT License"){
        licenseImg= "![license](https://img.shields.io/badge/license-MLT%20license-green)"
    }

    licenseDescription = "Licensed by " + response.license 
    
    
}