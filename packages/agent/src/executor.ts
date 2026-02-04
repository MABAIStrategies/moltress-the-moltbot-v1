import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const allowedCommands = new Set(["which", "where", "openclaw"]);

export type ExecResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
};

export async function runCommand(command: string, args: string[] = []): Promise<ExecResult> {
  if (!allowedCommands.has(command)) {
    return {
      stdout: "",
      stderr: `Command not allowed: ${command}`,
      exitCode: 1
    };
  }

  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      timeout: 5000,
      windowsHide: true
    });
    return { stdout: stdout.toString(), stderr: stderr.toString(), exitCode: 0 };
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; code?: number };
    return {
      stdout: err.stdout?.toString() ?? "",
      stderr: err.stderr?.toString() ?? String(error),
      exitCode: err.code ?? 1
    };
  }
}
