import { ParsedArgs } from "./parse-args.js";
import { WriterFactory } from "./writer.js";

export interface Command {
  name: string;
  description: string;
  usage: string;

  run(ctx: Context): Promise<number>
  commands: Record<string, Command>
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

export interface Context {
  output: Output,
  args: ParsedArgs,
  writerFactory: WriterFactory,
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
