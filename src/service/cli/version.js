'use strict';

const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(`v${packageJson.version}`);
  }
};
