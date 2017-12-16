/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');

const pathRegex = /path="(.*)"/g;

function doGetPaths(pathToRoutesFile) {
  const paths = [];

  try {
    const data = fs.readFileSync(pathToRoutesFile, 'utf8');
    let match = pathRegex.exec(data);

    while (match !== null) {
      paths.push(match[1]);
      match = pathRegex.exec(data);
    }
  } catch (err) {
    console.log(
      `👻  ${chalk.red('Error reading')} ${chalk.blueBright(pathToRoutesFile)}`,
      err
    );
  }

  return paths;
}

module.exports = doGetPaths;
