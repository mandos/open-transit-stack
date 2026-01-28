export function parseRow(row: string): string[] {
  return row.split(',');
}

export function parseHeader(row: string): string[] {
  return parseRow(row).map(x => {
    return x.trim().replaceAll(' ', '_').toLowerCase();

  });
};
