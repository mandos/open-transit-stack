export function expectCliHelp(out: { code: number, stdout: string, stderr: string }) {
  expect(out.stderr).toBe('');
  expect(out.stdout).toMatch(/Usage:/);
  expect(out.stdout).toMatch(/Commands:/);
  expect(out.code).toBe(0);
}
