import { createWriteStream } from "node:fs";
import * as path from "node:path";
import * as yauzl from "yauzl";

export async function extract(filePath: string, outputDir: string): Promise<string[]> {
  const files: string[] = [];

  return new Promise((resolve, reject) => {
    yauzl.open(filePath, { autoClose: true, lazyEntries: true }, function (err: Error | null, zipfile: yauzl.ZipFile) {
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
