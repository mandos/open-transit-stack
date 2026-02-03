import { parseLatitude, parseLongitude } from "./parser.js";

describe('parseLatitude', () => {
  it('should return error if is out of limit', () => {
    expect(() => parseLatitude("-90.1")).toThrowError(/-90.*90/);
  });

  it('should return error if is not a number', () => {
    expect(() => parseLatitude("-10.20.30")).toThrowError(/be number/);
  });

  it('should return number', () => {
    expect(parseLatitude("10.123456789")).toStrictEqual(10.123456789);
  });
});

describe('parseLogitude', () => {
  it('should return error if is out of limit', () => {
    expect(() => parseLongitude("-180.1")).toThrowError(/-180.*180/);
    expect(() => parseLongitude("+180.1")).toThrowError(/-180.*180/);
  });

  it('should return error if is not a number', () => {
    expect(() => parseLongitude("-10.20.30")).toThrowError(/be number/);
  });

  it('should return number', () => {
    expect(parseLongitude("10.123456789")).toStrictEqual(10.123456789);
  });
});
