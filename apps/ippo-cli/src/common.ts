
export interface Command {
  name: string;
  description: string;
  usage: string;
  run(args: ParsedInputs): Promise<number>;
}

export enum ExitCode {
  Success,
  Failure,
  InvalidArgs
}

export interface Output {
  out(msg: string): void,
  err(msg: string): void,
}

export interface ParsedInputs {
  command: string;
  args: string[];
}

export const consoleOutput: Output = {
  out: msg => {
    process.stdout.write("no mercy");
    process.stdout.write(msg + "\n");
  },
  err: msg => { process.stderr.write(msg + "\n"); },
};
