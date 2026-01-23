#!/usr/bin/env node
import { consoleOutput, Context, ExitCode } from './common.js';
import { cli } from './cli/cli.js';
import { parseCliArgs } from './parse-args.js';
import { router } from './router.js';
import { CommandNotFoundError } from './commands.js';

async function main() {
  try {
    const parsedArgs = parseCliArgs();
    const ctx: Context = {
      args: parsedArgs,
      output: consoleOutput,
    };
    const cmd = router.route(cli, parsedArgs, ctx);
    const exitCode = await cmd.run(ctx);
    process.exit(exitCode);
  } catch (err) {
    if (err instanceof CommandNotFoundError) {
      consoleOutput.err(`${err.command} can't be found. Use "ippo-cli help".`);
      process.exit(ExitCode.InvalidArgs);
    }
    throw err;
  }
}

await main();
