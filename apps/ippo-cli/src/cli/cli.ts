import { Command, ExitCode, Output } from '../common.js';
import { showCommand } from "../commands/index.js";
import { parseArgs } from 'util';

function route(
  commands: Command[],
  command: string
): Command | null {
  return commands.find(c => c.name === command) ?? null;
}

export const cli: Command = {
  name: "ippo-cli",
  description: "Toolbox utility for file packages in General Transit Feed Specification format.",
  usage: `ippo-cli <command> [options]
    Commands:
      show: ${showCommand.description}
`,
  argsConfig: {
    options: {
      help: {
        type: "boolean",
        short: "h",
        default: false,
      }
    },
    strict: false,
    allowPositionals: true,
  },

  async run(args: string[], output: Output): Promise<number> {
    const { values, positionals } = parseArgs({ ...this.argsConfig, args: args });

    // console.log(args);
    // console.log(values);
    console.log(positionals);

    const parsedVal = values as { help?: boolean };
    if (parsedVal.help === true || positionals.length === 0) {
      output.out(`Name: ${this.name}`);
      output.out(`Description: ${this.description}`);
      output.out(`Usage: ${this.usage}`);
    }

    const commands: Command[] = [showCommand];
    if (positionals[0]) {
      const cmd = route(commands, positionals[0]);
      if (!cmd) {
        output.err(`Command ${positionals[0]} not found.`);
        return ExitCode.InvalidArgs;
      }
      return cmd.run(args, output);
    }
    return 0;
  },
};
