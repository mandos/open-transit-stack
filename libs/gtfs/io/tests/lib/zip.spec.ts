import { mkdtemp, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'os';
import { isZipFile, extract } from '../../src/lib/zip.js';
import path from "node:path";


describe("isZipFile", () => {
  it("detects Zip file", async () => {
    const file = path.join(__dirname, "../fixtures", "zip-file.zip");
    await expect(isZipFile(file)).resolves.toBe(true);

  });

  it("detects non Zip file", async () => {
    const file = path.join(__dirname, "../fixtures", "not-zip-file.zip");
    await expect(isZipFile(file)).resolves.toBe(false);
  });
});

describe("extract", () => {
  const expected_files = ["file-1.txt", "file-2.txt", "file-3.txt"];
  const zipFile = path.join(__dirname, "../fixtures", "zip-file.zip");

  it("should reject not zip file", async () => {
    const file = path.join(__dirname, "../fixtures", "not-zip-file.zip");
    const targetDir = await mkdtemp(path.join(tmpdir(), "gtfs_io_test_zip_"));
    await expect(extract(file, targetDir)).rejects.toThrowError(/not a zip file/);
  });

  it("should return list of files in zip file", async () => {
    const targetDir = await mkdtemp(path.join(tmpdir(), "gtfs_io_test_zip_"));
    const returned_files = await extract(zipFile, targetDir);

    expect(returned_files).toHaveLength(expected_files.length);
    expect(returned_files).toEqual(expect.arrayContaining(expected_files));
  });

  it("should extract files from archivum to specific folder", async () => {
    const targetDir = await mkdtemp(path.join(tmpdir(), "gtfs_io_test_zip_"));

    await extract(zipFile, targetDir);
    const actual_files = await readdir(targetDir);

    expect(actual_files).toHaveLength(expected_files.length);
    expect(actual_files).toEqual(expect.arrayContaining(expected_files));
    for (const file of expected_files) {
      // console.log(path.join(targetDir, file));
      await expect(readFile(path.join(targetDir, file), "utf-8")).resolves.toEqual("content of the file: " + file);
    }
  });
});
