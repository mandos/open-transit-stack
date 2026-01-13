import { ExitCode } from "../common.js";
import { cli } from "./cli.js";

function createMockOutput() {
  const stdout = [] as string[];
  const stderr = [] as string[];
  const output = {
    out(msg: string) {
      stdout.push(msg);
    },
    err(msg: string) {
      stderr.push(msg);
    }
  };
  return { output, stdout, stderr };
};

describe('run not existed command', () => {
  it('should display error when application does\'t have command', async () => {
    const { output, stdout, stderr } = createMockOutput();
    const exitCode = await cli(["not-existed-command"], output);
    expect(stdout.join()).toMatch('');
    expect(stderr.join()).toMatch(/not-existed-command/i);
    expect(exitCode).toBe(ExitCode.InvalidArgs);
  });
});
