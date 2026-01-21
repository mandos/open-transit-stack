import { parseCliArgs } from "../../src/parse-args";

describe('parseArgs', () => {

  it('should parse empty args list', () => {
    const parsedArgs = parseCliArgs([]);
    // NOTE: Consider using typecheck.enabled to true, and test some Types
    expect(parsedArgs).toEqual({ commands: [], options: {} });
  });

  it('should use first positional arg as command', () => {
    const parsedArgs = parseCliArgs(['expected-command']);
    expect(parsedArgs).toEqual({ commands: ['expected-command'], options: {} });
  });

  it('should use first two positional args as command and subcommand', () => {
    const parsedArgs = parseCliArgs(['expected-command', 'expected-subcommand', 'expected-other-subcommand']);
    expect(parsedArgs).toEqual({ commands: ['expected-command', 'expected-subcommand', 'expected-other-subcommand'], options: {} });
  });

  it('should parse options', () => {
    const parsedArgs = parseCliArgs(['cmd', '--help', '-h']);
    expect(parsedArgs).toEqual({ commands: ["cmd"], options: { help: true, h: true } });
  });

  it('should return flag, not matter where it used', () => {
    const parsedArgs1 = parseCliArgs(['expected-command', '--help', 'expected-subcommand']);
    const parsedArgs2 = parseCliArgs(['expected-command', 'expected-subcommand', '--help']);
    const expectedParsedArgs = { commands: ['expected-command', 'expected-subcommand'], options: { help: true } };

    expect(parsedArgs1).toEqual(expectedParsedArgs);
    expect(parsedArgs2).toEqual(expectedParsedArgs);
  });

  it('should parse values for options with equal between option and value', () => {
    const parsedArgs = parseCliArgs(['expected-command', '--file=my_file.txt']);
    const expectedParsedArgs = { commands: ['expected-command'], options: { file: 'my_file.txt' } };

    expect(parsedArgs).toEqual(expectedParsedArgs);
  });

  it.todo('should parse values for options with space between option and value', () => {
    const parsedArgs = parseCliArgs(['expected-command', '-o', 'output_file.txt']);
    const expectedParsedArgs = { commands: ['expected-command'], options: { o: 'output_file.txt' } };

    expect(parsedArgs).toEqual(expectedParsedArgs);
  });
});
