import { extract } from '@mandos-dev/gtfs-io';
import { validateFilesList } from '@mandos-dev/gtfs-validate';
import { mkdir, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { Command, ExitCode } from '../common.js';

type ShowOptions = {
  file: string,
}

export const showCommand: Command = {
  name: "show",
  description: "Show information about zip package",
  usage: "ippo-cli show -f=[file_path]",
  commands: {},
  async run(ctx) {
    const output = ctx.output
    try {
      const options = ctx.args.options as ShowOptions;
      if (!options.file) {
        throw new Error('Missing file options. Use "ippo-cli help show" to check all options.')
      }
      const zipFilePath = path.resolve(options.file);
      // TODO: Move creating tmp folder to generic IO lib
      const tmpDir = path.join(tmpdir(), "ippo-cli");
      await mkdir(tmpDir, { recursive: true });
      const destDirPath = await mkdtemp(path.join(tmpDir, path.parse(zipFilePath).name));
      const validationResult = validateFilesList(await extract(zipFilePath, destDirPath));
      const fileColumnWidth = [...validationResult.keys()].reduce((a, b) => b.length > a.length ? b : a, "").length + 5;
      for (const [file, result] of validationResult) {
        output.out(`${file.padEnd(fileColumnWidth)} ${result.status}`);
      }
    } catch (err) {
      console.error(err);
      output.err(err);
      return ExitCode.Failure;
    }
    // unzip file and get output folder
    // validateFileList and get information, if it's correct or not
    // show this information on screen

    validateFilesList([]);
    return ExitCode.Success;
  }
};
