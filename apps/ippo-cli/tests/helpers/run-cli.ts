import { spawn } from "node:child_process";
import { getExecFilePath } from "./path";

export async function runCli(
  args: string[] = [],
  options: { cwd?: string } = {}
): Promise<{ code: number, stdout: string, stderr: string }> {
  return new Promise((resolve) => {
    const distPathExec = getExecFilePath();

    const proc = spawn(
      process.execPath,
      [distPathExec, ...args],
      {
        cwd: options.cwd,
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    );

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d) => (stdout += d));
    proc.stderr.on('data', (d) => (stderr += d));
    proc.on('close', (code) => {
      resolve({
        code: code ?? -1,
        stdout: stdout,
        stderr: stderr,
      });
    });
  });
}
