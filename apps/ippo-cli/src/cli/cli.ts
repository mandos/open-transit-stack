export enum ExitCode {
  Success,
  Failure,
  InvalidArgs
}

export interface Output {
  out(msg: string): void,
  err(msg: string): void,
}

interface CliCommand {
  name: string;
  description: string;
  usage: string;
  run(args: ParsedInputs): Promise<number>;
}



export interface ParsedInputs {
  command: string;
  args: string[];
}

function parseInputs(argv: string[]): ParsedInputs {
  return {
    command: argv[0],
    args: argv.slice(1),
  }
}

function route(
  commands: CliCommand[],
  input: ParsedInputs,
): CliCommand | null {
  return commands.find(c => c.name === input.command) ?? null;
}

export async function cli(argv: string[], output: Output): Promise<number> {
  const input = parseInputs(argv)
  const commands: CliCommand[] = []
  const cmd = route(commands, input)

  if (!cmd) {
    output.err(`Command ${input.command} not found.`)
    return ExitCode.InvalidArgs
  }
  return cmd.run(input)
}
