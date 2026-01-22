import { CommandNotFoundError } from "./commands.js";
import { Command, Context } from "./common.js";
import { ParsedArgs } from "./parse-args.js";

type GlobalOptions = {
  h?: boolean,
  help?: boolean,
}

export const router = {
  route: function (root: Command, args: ParsedArgs, ctx: Context): Command {

    // Normalize global --help into help command
    const options = (args.options as GlobalOptions);
    if (args.commands[0] === 'help' || args.commands.length === 0) {
      return this.get(root, ['help']);
    }

    if (options.h || options.help) {
      return this.get(root, ['help']);
    };
    return this.get(root, args.commands);
  },

  get: function (root: Command, commands: string[]): Command {
    let currCmd = root;
    for (const cmdName of commands) {
      // console.log(currCmd.commands);
      // console.log(cmdName);
      if (cmdName in currCmd.commands) {
        currCmd = currCmd.commands[cmdName];
      }
    }

    if (commands.length > 0 && currCmd === root) {
      throw new CommandNotFoundError("msg", commands.join(":"));
    }
    return currCmd;

  }

};
