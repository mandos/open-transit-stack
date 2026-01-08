import { ParsedInputs, Command, ExitCode, Output } from '../common.js';
import { showCommand } from "../commands/index.js";

function parseInputs(argv: string[]): ParsedInputs {
  return {
    command: argv[0],
    args: argv.slice(1),
  };
}

function route(
  commands: Command[],
  input: ParsedInputs,
): Command | null {
  return commands.find(c => c.name === input.command) ?? null;
}

export async function cli(argv: string[], output: Output): Promise<number> {
  const input = parseInputs(argv);
  const commands: Command[] = [showCommand];
  const cmd = route(commands, input);

  if (!cmd) {
    output.err(`Command ${input.command} not found.`);
    return ExitCode.InvalidArgs;
  }
  return cmd.run(input);
}
