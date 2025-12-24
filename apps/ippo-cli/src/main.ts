#!/usr/bin/env node

import { cli, Output } from './cli/cli.js';

const consoleOutput: Output = {
  out: msg => { process.stdout.write(msg + "\n") },
  err: msg => { process.stderr.write(msg + "\n") },
}

async function main() {
  const exitCode = await cli(process.argv.slice(2), consoleOutput);
  process.exit(exitCode);
}

main()
