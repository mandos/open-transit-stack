import { runCli } from '../helpers/run-cli';
import { expectCliHelp } from '../helpers/assertions';

describe("CLI application", () => {

  it('without any option should show help', async () => {
    expectCliHelp(await runCli());
  });

  it('with "--help" option, should show help', async () => {
    expectCliHelp(await runCli(['--help']));
  });


  it('with "show --help" option should show help for "show command"', async () => {
    const { code, stdout, stderr } = (await runCli(['show', '--help']));
    expect(stderr).toBe('');
    expect(stdout).toMatch(/show.*-f.*file/);
    expect(stdout).not.toMatch(/Commands:/);
    expect(code).toBe(0);
  });

  it("should return error for unknown command", async () => {
    const { code, stdout, stderr } = await runCli(["non-existed-command"]);
    expect(stderr).toMatch(/non-existed-command can't be found/);
    expect(stderr).toMatch(/use.*help/i);
    expect(stdout).toBe('');
    expect(code).toBe(2);
  });
});
