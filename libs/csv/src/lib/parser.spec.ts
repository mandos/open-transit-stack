import { parseRow, parseHeader } from './parser.js';

describe('parseRow', () => {
  it('should return array of string', () => {
    const line = 'field_1,field_2,field_3';
    expect(parseRow(line)).toEqual(['field_1', 'field_2', 'field_3']);
  });
  it('without quote should preserve spaces', () => {
    const line = 'field_1, field_2, field_3';
    const expectedFields = ['field_1', ' field_2', ' field_3'];
    expect(parseRow(line)).toStrictEqual(expectedFields);
  });
});

describe('parseHeader', () => {
  it('should return string array with normalized headers', () => {
    const headerLine = 'Header1, header_2, header 3';
    const expectedHeaders = ['header1', 'header_2', 'header_3'];

    expect(parseHeader(headerLine)).toStrictEqual(expectedHeaders);
  });
});
