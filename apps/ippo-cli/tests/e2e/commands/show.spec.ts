import { getFixtureFilePath } from '../../helpers/path';
import { runCli } from '../../helpers/run-cli';

describe('show command', () => {
  it('with only "-f" should return error message about missing option', async () => {
    const out = await runCli(['show', `--file=`]);
    expect(out.code).toBe(1);
    expect(out.stdout).toBe('');
    expect(out.stderr).toMatch(/missing file.*use.*help/i);
  });
  it('with "-f=missing_file" should return error message', async () => {
    const inputFile = getFixtureFilePath('file-not-exists.zip');
    const out = await runCli(['show', `--file=${inputFile}`]);
    expect(out.code).toBe(1);
    expect(out.stdout).toBe('');
    expect(out.stderr).toMatch(new RegExp(`such.*${inputFile}`));
  });
  it('with "-f=wrong_format_file" should return error message', async () => {
    const inputFile = getFixtureFilePath('not-zip-file.zip');
    const out = await runCli(['show', `--file=${inputFile}`]);
    expect(out.code).toBe(1);
    expect(out.stdout).toBe('');
    expect(out.stderr).toMatch(/not a zip/);
  });
  it('with "-f=file" option should show status report for GTFS package', async () => {
    const out = await runCli(['show', `--file=${getFixtureFilePath('gtfs-sapporo.zip')}`]);
    expect(out.code).toBe(0);
    expect(out.stderr).toBe('');
    expect(out.stdout).toMatch(/agency\.txt.*present/);
    expect(out.stdout).toMatch(/areas\.txt.*missing/);
    expect(out.stdout).toMatch(/routes_jp\.txt.*unknown/);
  });
});
