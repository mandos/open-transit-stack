import { fileURLToPath } from "node:url";
import path from "node:path";

export function getFixtureFilePath(file: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, '../fixtures/', file);
}

export function getExecFilePath(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.join(__dirname, '../../dist/', 'ippo-cli.js');
}
