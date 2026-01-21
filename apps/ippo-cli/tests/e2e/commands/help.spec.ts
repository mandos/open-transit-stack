import { runCli } from '../../helpers/run-cli';
import { expectCliHelp } from '../../helpers/assertions';

describe('help command', () => {
  it('without options should show application help', async () => {
    const output = (await runCli(["help"]));
    expectCliHelp(output);
  });

  it('with "--help" option should show help for "help command"', async () => {
    const { code, stdout, stderr } = (await runCli(['help', '--help']));
    expect(stderr).toBe('');
    expect(stdout).toMatch(/help.*for.*command/);
    expect(stdout).not.toMatch(/Commands:/);
    expect(code).toBe(0);
  });

  it('with "show" positional arg should show help for "show command"', async () => {
    const { code, stdout, stderr } = (await runCli(['help', 'show']));
    expect(stderr).toBe('');
    expect(stdout).toMatch(/show.*-f.*file/);
    expect(stdout).not.toMatch(/Commands:/);
    expect(code).toBe(0);
  });
});
