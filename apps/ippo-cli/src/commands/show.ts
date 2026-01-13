import { extract } from '@mandos-dev/gtfs-io';
import { validateFilesList } from '@mandos-dev/gtfs-validate';
import { mkdir, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { Command, consoleOutput, ExitCode, ParsedInputs } from '../common.js';

export const showCommand: Command = {
  name: "show",
  description: "Show information about zip package",
  usage: "you can figure out",
  run: async (args: ParsedInputs) => {
    // create folder in tmp, based on hash?
    //
    try {
      // TODO: Create way to parse args
      const zipFilePath = path.resolve(args.args[1]);
      // TODO: Move creating tmp folder to generic IO lib
      const tmpDir = path.join(tmpdir(), "ippo-cli");
      await mkdir(tmpDir, { recursive: true });
      const destDirPath = await mkdtemp(path.join(tmpDir, path.parse(zipFilePath).name));
      const validationResult = validateFilesList(await extract(zipFilePath, destDirPath));
      const fileColumnWidth = [...validationResult.keys()].reduce((a, b) => b.length > a.length ? b : a, "").length + 5;
      for (const [file, result] of validationResult) {
        consoleOutput.out(`${file.padEnd(fileColumnWidth)} ${result.status}`);
      }
      // consoleOutput.err(`File: ${zipFilePath}; directory ${destDirPath}`);
    } catch (err) {
      consoleOutput.err(err);
    }
    // unzip file and get output folder
    // validateFileList and get information, if it's correct or not
    // show this information on screen

    validateFilesList([]);
    return ExitCode.Success;
  }
};
