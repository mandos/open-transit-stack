import { Command, Context } from "../common.js";
import { router } from "../router.js";
import { cli } from "../cli/cli.js";

function showHelp(ctx: Context, cmd: Command): number {
  ctx.output.out(`Name: ${cmd.name}`);
  ctx.output.out(`Description: ${cmd.description}`);
  ctx.output.out(`Usage: ${cmd.usage}`);
  return 0;
}

type GlobalOptions = {
  h?: boolean,
  help?: boolean,
}

export const helpCommand: Command = {
  name: "help",
  description: "Show help for specific command.",
  usage: 'ippo-cli help [command]',
  commands: {},
  async run(ctx: Context): Promise<number> {
    const options = (ctx.args.options as GlobalOptions);
    if (ctx.args.commands[0] === 'help' && (ctx.args.commands.length > 1 || !(options.h || options.help))) {
      ctx.args.commands.shift();
    }
    const cmd = router.get(cli, ctx.args.commands);

    return showHelp(ctx, cmd);
    // } else {
    //   return this.showHelp(ctx, cli);
    // };
  },
};
