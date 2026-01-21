import { ExitCode, Context, Command } from '../common.js';
import { showCommand } from '../commands/show.js';
import { helpCommand } from '../commands/help.js';

// This shouldn't be run at all, cli object is only for help
export const cli: Command = {
  name: "ippo-cli",
  description: "Toolbox utility for file packages in General Transit Feed Specification format.",
  usage: `ippo-cli <command> [options]
    Commands:
      show: ${showCommand.description}
`,
  commands: {
    show: showCommand,
    help: helpCommand,
  },
  async run(ctx: Context): Promise<number> {
    return ExitCode.Failure;
  }
};
