const path = require(`path`);

// Together with "jest" voodoo in package.json, this will help fix the issue of
// tests failing when any static assets are imported with file-loader.
// See: https://github.com/facebook/jest/issues/2663
// https://jestjs.io/docs/en/webpack
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
