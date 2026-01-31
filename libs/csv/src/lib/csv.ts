import { createReadStream, PathLike } from "node:fs";
import { parseHeader, parseRow } from "./parser.js";
import { createInterface } from "node:readline/promises";

export type CsvOptions = { header: boolean };

// TODO: How to fix overloading with boolean?
// export function readCsv(path: PathLike, options: { header: true }): Promise<Record<string, string>[]>;
// export function readCsv(path: PathLike, options: { header: false }): Promise<string[][]>;
export async function readCsv(path: PathLike, options: CsvOptions = { header: false }) {
  const csv: Array<Record<string, string> | string[]> = [];
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  });

  for await (const row of parseCsv(rl, options)) {
    csv.push(row);
  }
  return csv;
}

// TODO: How to fix overloading with boolean?
// export function parseCsv(lines: AsyncIterable<string>, options: { header: true }): AsyncIterableIterator<Record<string, string>>;
// export function parseCsv(path: AsyncIterable<string>, options: { header: false }): AsyncIterableIterator<string[]>;
export async function* parseCsv(lines: AsyncIterable<string>, options: CsvOptions = { header: false }): AsyncIterableIterator<Record<string, string> | string[]> {
  let readHeader = false;
  let headers: string[] | null = null;

  if (options?.header) {
    readHeader = true;
  }
  for await (const line of lines) {
    if (readHeader) {
      headers = parseHeader(line);
      readHeader = false;
      continue;
    }
    if (headers) {
      yield parseRow(line, headers);
    } else {
      yield parseRow(line);
    }
  }
}
