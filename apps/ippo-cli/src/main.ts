#!/usr/bin/env node

import { log } from 'console';
import { consoleOutput } from './common.js';
import { cli } from './cli/cli.js';

async function main() {
  log(process.argv);
  const exitCode = await cli(process.argv.slice(2), consoleOutput);
  process.exit(exitCode);
}

main();
