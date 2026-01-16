#!/usr/bin/env node
import { consoleOutput } from './common.js';
import { cli } from './cli/cli.js';

async function main() {
  const exitCode = await cli.run(process.argv.slice(2), consoleOutput);
  process.exit(exitCode);
}

main();
