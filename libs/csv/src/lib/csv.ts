import { open, } from "node:fs/promises";
import { PathLike } from "node:fs";
import { parseHeader, parseRow } from "./parser.js";

export interface CsvOptions {
  header?: boolean,
}

export function readCsv(path: PathLike, options: { header: true }): Promise<Record<string, string>[]>;
export function readCsv(path: PathLike, options?: { header?: false }): Promise<string[][]>;
export async function readCsv(path: PathLike, options?: CsvOptions) {
  const csv: any[] = [];
  const fh = await open(path);

  console.log(options);
  try {
    let readHeader = false;
    let headers: string[] | null = null;

    if (options?.header) {
      readHeader = true;
    }
    for await (const row of fh.readLines()) {
      if (readHeader) {
        headers = parseHeader(row);
        readHeader = false;
        continue;
      }
      if (headers) {
        csv.push(parseRow(row, headers));
      } else {
        csv.push(parseRow(row));
      }
    }
  } finally {
    fh?.close();
  }
  return csv;
}
