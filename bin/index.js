#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function main() {
  return yargs(hideBin(process.argv))
    .command(
      'dev [url]',
      'dev the url',
      (yargs) => {
        yargs.positional('url', {
          describe: 'url',
          default: 'https://www.baidu.com',
        });
      },
      (argv) => {
        if (argv.verbose) console.info(`start url on :${argv.url}`);
        require('../node/run')(argv.url);
      },
    )
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    }).argv;
}

main();
