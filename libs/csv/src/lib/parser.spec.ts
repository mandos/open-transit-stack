import { parseRow, parseHeader, parseRowWithHeaders } from './parser.js';

describe('parseHeader', () => {
  it('should return string array with normalized headers', () => {
    const headerLine = 'Header1, header_2, header 3';
    const expectedHeaders = ['header1', 'header_2', 'header_3'];

    expect(parseHeader(headerLine)).toStrictEqual(expectedHeaders);
  });
});

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

describe('parseRowWithHeaders', () => {
  it('should return Record<string,string>', () => {
    const input = 'moo,42,true';
    const headers = ['col1', 'col2', 'col3'];

    expect(parseRowWithHeaders(input, headers)).toStrictEqual({ col1: "moo", col2: "42", col3: "true" });
  });
});
