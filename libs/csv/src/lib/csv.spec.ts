import { parseCsv, readCsv } from './csv.js';
import * as fs from 'node:fs/promises';

function asyncLines(lines: string[]): AsyncIterable<string> {
  return {
    async *[Symbol.asyncIterator]() {
      for (const line of lines) {
        yield line;
      }
    }
  };
}

export function mockReadLines(lines: string[]) {
  const close = vi.fn().mockResolvedValue(undefined);
  vi.mock('node:fs/promises', () => ({
    open: vi.fn(),
  }));

  vi.mocked(fs.open).mockResolvedValue({
    readLines: () => asyncLines(lines),
    close,
  } as any);
}

describe('parseCsv', () => {
  it('should parse lines without header', async () => {
    const lines = async function* (): AsyncIterableIterator<string> {
      yield 'moo,42,true';
      yield 'boo,99,false';
    };
    const expected = [
      ['moo', '42', 'true'],
      ['boo', '99', 'false'],
    ];

    const result: string[][] = [];
    for await (const row of parseCsv(lines())) {
      result.push(row);
    }
    expect(result).toStrictEqual(expected);
  });

  it('should parse lines with header', async () => {
    const lines = async function* (): AsyncIterableIterator<string> {
      yield 'header1,header2,header3';
      yield 'moo,42,true';
      yield 'boo,99,false';
    };
    const expected = [
      { header1: 'moo', header2: '42', header3: 'true' },
      { header1: 'boo', header2: '99', header3: 'false' },
    ];
    const result: Record<string, string>[] = [];
    for await (const row of parseCsv(lines(), { header: true })) {
      result.push(row);
    }
    expect(result).toStrictEqual(expected);
  });
});


// TODO: Write it once again with mocks
describe.todo('readCsv', () => {
  it('should parse file with header', async () => {

    const csvLines = [
      'header_1,header_2,header_3',
      'moo,42,true',
      'boo,99,false'
    ];

    const expectedResult = [
      { header_1: "moo", header_2: "42", header_3: "true" },
      { header_1: "boo", header_2: "99", header_3: "false" },
    ];

    mockReadLines(csvLines);

    const path = '/example.csv';
    const data = readCsv(path, { header: true, });
    await expect(data).resolves.toStrictEqual(expectedResult);
  });

  it('should parse line without header', async () => {

    const csvLines = [
      'moo,42,true',
      'boo,99,false'
    ];
    const expectedResult = [
      ["moo", "42", "true"],
      ["boo", "99", "false"],
    ];
    mockReadLines(csvLines);

    const path = '/example.csv';
    const data = readCsv(path, { header: false, });
    await expect(data).resolves.toStrictEqual(expectedResult);
  });

});
