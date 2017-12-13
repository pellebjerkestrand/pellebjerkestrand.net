/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '..', 'source', 'routes.jsx');
const pathRegex = /path="(.*)"/g;

function doGetPaths() {
  const paths = [];

  try {
    const data = fs.readFileSync(fileName, 'utf8');
    let match = pathRegex.exec(data);

    while (match !== null) {
      paths.push(match[1]);
      match = pathRegex.exec(data);
    }
  } catch (err) {
    console.log(
      `👻  ${chalk.red('Error reading')} ${chalk.blueBright(fileName)}`,
      err
    );
  }

  return paths;
}

module.exports = doGetPaths;
