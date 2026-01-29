export function parseRow(row: string, headers: string[]): Record<string, string>;
export function parseRow(row: string, headers?: null): string[];
export function parseRow(row: string, headers?: string[] | null) {
  const result = basicParseRow(row);
  if (headers) {

    const parsedResult: Record<string, string> = {};
    for (const [index, column] of headers.entries()) {
      parsedResult[column] = result[index];
    }
    return parsedResult;
  } else {
    return result;
  }
}

export function basicParseRow(row: string): string[] {
  return row.split(',');
}

export function parseHeader(row: string): string[] {
  return basicParseRow(row).map(x => {
    return x.trim().replaceAll(' ', '_').toLowerCase();
  });
};
