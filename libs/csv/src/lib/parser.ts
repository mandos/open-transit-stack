export function parseRowWithHeaders(row: string, headers: string[]): Record<string, string> {
  const result = parseRow(row);
  const parsedResult: Record<string, string> = {};
  for (const [index, column] of headers.entries()) {
    parsedResult[column] = result[index];
  }
  return parsedResult;
}

export function parseRow(row: string): string[] {
  return row.split(',');
}

export function parseHeader(row: string): string[] {
  return parseRow(row).map(x => x.trim().replaceAll(' ', '_').toLowerCase());
};

export function parseCsvText(text: string): Record<string, string>[] {
  const stripped = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const lines = stripped.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length === 0) return [];
  const headers = parseHeader(lines[0]);
  return lines.slice(1).map((line) => parseRowWithHeaders(line, headers));
}
