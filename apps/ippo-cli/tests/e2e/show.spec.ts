import { runCli } from './helpers/run-cli';

describe("Main program", () => {
  it("should run without any options and show help", async () => {
    const { code, stdout, stderr } = await runCli();

    expect(code).toBe(0);
    expect(stderr).toBe('');
    expect(stdout).toMatch(/Usage:/);
    expect(stdout).toMatch(/Commands:/);
  })
})
