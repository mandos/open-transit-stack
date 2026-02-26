import { createReadStream, PathLike } from "node:fs";
import { parseHeader, parseRow, parseRowWithHeaders } from "./parser.js";
import { createInterface } from "node:readline/promises";

export type CsvOptions = { header: boolean };

// TODO: How to fix overloading with boolean? Issue with widening by TS compler.
// export function readCsv(path: PathLike, options: { header: true }): Promise<Record<string, string>[]>;
// export function readCsv(path: PathLike, options: { header: false }): Promise<string[][]>;
export async function* readCsv(
  path: PathLike,
  options: CsvOptions = { header: false }
): AsyncIterableIterator<Record<string, string> | string[]> {

  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  });

  for await (const row of parseCsvLines(rl, options)) {
    yield row;
  }
}

// TODO: How to fix overloading with boolean? Issue with widening by TS compler.
// export function parseCsv(lines: AsyncIterable<string>, options: { header: true }): AsyncIterableIterator<Record<string, string>>;
// export function parseCsv(path: AsyncIterable<string>, options: { header: false }): AsyncIterableIterator<string[]>;
export async function* parseCsvLines(lines: AsyncIterable<string>, options: CsvOptions = { header: false }): AsyncIterableIterator<Record<string, string> | string[]> {
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
      yield parseRowWithHeaders(line, headers);
    } else {
      yield parseRow(line);
    }
  }
}
