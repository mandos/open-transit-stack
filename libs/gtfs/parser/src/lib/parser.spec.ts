import { parseBoolean, parseLatitude, parseLongitude, parseFloat, ParserSpec, parseSchema, createEnumParser } from "./parser.js";

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

describe('parseBoolean', () => {
  it('should parse "false", "0", "no" as false', () => {
    expect(parseBoolean("false")).toStrictEqual(false);
    expect(parseBoolean("0")).toStrictEqual(false);
    expect(parseBoolean("no")).toStrictEqual(false);
  });
  it('should parse "true", "1", "yes" as true', () => {
    expect(parseBoolean("true")).toStrictEqual(true);
    expect(parseBoolean("1")).toStrictEqual(true);
    expect(parseBoolean("yes")).toStrictEqual(true);
  });
  it('other values than above should throw error', () => {
    expect(() => parseBoolean("")).toThrowError(/recognize.*boolean.*value/);
    expect(() => parseBoolean("boo")).toThrowError(/recognize.*boolean.*value/);
    expect(() => parseBoolean("-10")).toThrowError(/recognize.*boolean.*value/);
  });
});

describe('parseFloat', () => {
  it('should parse correct float string', () => {
    expect(parseFloat("10")).toStrictEqual(10);
    expect(parseFloat(" 42.42 ")).toStrictEqual(42.42);
    expect(parseFloat(" 42.00 ")).toStrictEqual(42);
    expect(parseFloat(" 42.0042 ")).toStrictEqual(42.0042);
  });
  it('should throw error for wrong float', () => {
    expect(() => parseFloat("fail")).toThrowError(/fail.*not.*float/);
    expect(() => parseFloat("false")).toThrowError(/false.*not.*float/);;
    expect(() => parseFloat("42.42.42")).toThrowError(/42\.42\.42.*not.*float/);
  });
});



describe('parseSchema', () => {
  interface Boo {
    id: string,
    isCorrect: boolean,
    counter: number
  }
  const booSchema: ParserSpec<Boo> = {
    fields: {
      id: { parser: String },
      isCorrect: { parser: parseBoolean },
      counter: { parser: parseFloat },
    },
    build: (data) => {
      return (data as Boo);
    }
  };
  it('should return specific object if parse process is correct', () => {
    const input = { id: "moo", isCorrect: "false", counter: "42" };
    const expected: Boo = { id: "moo", isCorrect: false, counter: 42 };
    expect(parseSchema(input, booSchema)).toStrictEqual(expected);
  });
  it('should throw error for fields not existed in parseSchema)', () => {
    const input = { shouldNotBeHere: "fail", neitherIt: "fail" };
    expect(() => parseSchema(input, booSchema)).toThrowError(/shouldNotBeHere.*is not.*neitherIt.*is not/s);
  });
  it('should throw error for fields which are not correctly parsed)', () => {
    const input = { id: "moo", isCorrect: "fail", counter: "42.42.42" };
    expect(() => parseSchema(input, booSchema)).toThrowError(/boolean.*float/s);
  });
});


describe('parseEnum', () => {
  const BooEnum = {
    Moo: 0,
    Foo: 1,
    Doo: 2,
  } as const;
  type BooEnum = typeof BooEnum[keyof typeof BooEnum];


  it('should return correct parser', () => {
    const parser = createEnumParser(BooEnum);
    expect(parser("2")).toStrictEqual(BooEnum.Doo);
  });

  it('should be used in ParserSpec', () => {
    interface FooObject {
      booEnum: BooEnum,
    }
    const fooSchema: ParserSpec<FooObject> = {
      fields: {
        booEnum: { parser: createEnumParser(BooEnum) },
      },
      build: (data) => { return data as FooObject; }
    };

    expect(parseSchema({ booEnum: "0" }, fooSchema)).toStrictEqual({ booEnum: 0 });

  });
});
