/* eslint-env node */
/* eslint-disable no-console */
function createJsxFileContents(
  componentName,
  componentPascalName,
  shouldBeStateful = false
) {
  if (!componentName || !componentPascalName) {
    console.log('👻  You must specify a component name.');

    process.exit(1);
  }

  const head = "import React from 'react';";
  const tail = `export default ${componentPascalName}`;

  if (shouldBeStateful) {
    return `${head}

      class ${componentPascalName} extends React.Component {
        state = {};

        render() {
          return <div className="${componentName}"></div>;
        }
      }

      ${tail}`;
  }

  return `${head}

    const ${componentPascalName} = () => <div className="${componentName}"></div>;

    ${tail}`;
}

module.exports = createJsxFileContents;
