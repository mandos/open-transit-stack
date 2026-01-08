import { createWriteStream, type PathLike } from "node:fs";
import { open } from "node:fs/promises";
import * as path from "node:path";
import * as yauzl from "yauzl/index.js";

export async function isZipFile(path: PathLike): Promise<boolean> {
  // console.log(path)
  const fd = await open(path, "r");
  try {
    const buffer = Buffer.alloc(4);
    await fd.read(buffer);
    // 4 bytes for zip file, two are same, third is different based on type of zip file
    // 50 4B 03 04 — standard ZIP
    // 50 4B 05 06 — empty ZIP archive
    // 50 4B 07 08 — spanned ZIP
    return (
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      (buffer[2] === 0x03 ||
        buffer[2] === 0x05 ||
        buffer[2] === 0x07)
    );
  } finally {
    fd.close();
  }
}

export async function extract(filePath: string, outputDir: string): Promise<string[]> {
  const files: string[] = [];

  return new Promise((resolve, reject) => {
    yauzl.open(filePath, { autoClose: true, lazyEntries: true }, function (err: Error | null, zipfile?: yauzl.ZipFile) {
      // console.log("number of entries:", zipfile.entryCount);
      if (err) {
        reject(err);
        return;
      }

      zipfile.readEntry();
      zipfile.on("entry", function (entry: yauzl.Entry) {
        if (/\/$/.test(entry.fileName)) {
          // console.log("I'm in?")
          // Directory file names end with '/'.
          // Note that entries for directories themselves are optional.
          // An entry's fileName implicitly requires its parent directories to exist.
          zipfile.readEntry();
        } else {
          const destPath = path.join(outputDir, entry.fileName);
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err || !readStream) reject(err);
            const writeStream = createWriteStream(destPath);
            readStream.pipe(writeStream);
          });

          files.push(entry.fileName);
          zipfile.readEntry();
        }
      });

      zipfile.on("close", function () {
        resolve(files);
      });

      zipfile.on("error", function () {
        reject(new Error("I have no idea, but there is error!"));
      });
    });
  });
}
