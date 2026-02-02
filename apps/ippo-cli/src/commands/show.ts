import { extract } from '@mandos-dev/gtfs-io';
import { validateFilesList } from '@mandos-dev/gtfs-validate';
import { mkdir, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { Command, Context, ExitCode, Output } from '../common.js';
// import { parseAgencyFeed } from '@mandos-dev/gtfs-parser';
import { readAgencyFeed } from '@mandos-dev/gtfs-parser';
import { Agency } from '@mandos-dev/gtfs-core';

type ShowOptions = {
  file: string,
  type?: "agency"
}

export const showCommand: Command = {
  name: "show",
  description: "Show information about zip package",
  usage: "ippo-cli show -f=[file_path]",
  commands: {},

  async run(ctx) {
    const output = ctx.output;
    try {
      const options = ctx.args.options as ShowOptions;
      if (!options.file) {
        throw new Error('Missing file options. Use "ippo-cli help show" to check all options.');
      }
      const zipFilePath = path.resolve(options.file);
      const tmpDir = path.join(tmpdir(), "ippo-cli");
      await mkdir(tmpDir, { recursive: true });
      const feedDir = await mkdtemp(path.join(tmpDir, path.parse(zipFilePath).name));
      const fileList = await extract(zipFilePath, feedDir);

      if (!options.type) {
        showFiles(fileList, output);
      } else if (options.type == "agency") {
        await showAgencyFeed(path.join(feedDir, 'agency.txt'), ctx);
      }
    } catch (err) {
      console.error(err);
      output.err(err);
      return ExitCode.Failure;
    }

    validateFilesList([]);
    return ExitCode.Success;
  }
};

function showFiles(fileList: string[], output: Output) {
  const validationResult = validateFilesList(fileList);
  const fileColumnWidth = [...validationResult.keys()].reduce((a, b) => b.length > a.length ? b : a, "").length + 5;
  output.out("---------------------------- File list -------------------------------------------");
  for (const [file, result] of validationResult) {
    output.out(`${file.padEnd(fileColumnWidth)} ${result.status}`);
  }
  output.out("\n\n");
}

async function showAgencyFeed(feedLocation: string, ctx: Context) {
  const writer = ctx.writerFactory<Agency[]>();
  const agencies = await readAgencyFeed(feedLocation);
  await writer.write(agencies, ctx.output);
}
