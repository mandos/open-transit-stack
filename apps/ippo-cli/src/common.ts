// NOTE:
import { ParseArgsConfig } from "util";

export interface Command {
  name: string;
  description: string;
  usage: string;
  argsConfig: ParseArgsConfig;
  run(args: string[], output: Output): Promise<number>;
}

export enum ExitCode {
  Success,
  Failure,
  InvalidArgs
}

export interface Output {
  out(msg: string): void,
  err(msg: string | unknown): void,
}

export const consoleOutput: Output = {
  out: msg => {
    process.stdout.write(msg + "\n");
  },
  err: msg => {
    const errMsg = msg instanceof Error ? msg.message : String(msg);
    process.stderr.write(errMsg + "\n");
  },
};
