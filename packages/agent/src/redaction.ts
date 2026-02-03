const patterns: RegExp[] = [
  /([A-Za-z0-9_-]{24,})/g,
  /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g,
  /(sk-[A-Za-z0-9]+)/g
];

export function redactLine(line: string): string {
  return patterns.reduce((acc, pattern) => acc.replace(pattern, "[REDACTED]"), line);
}

export function redactLines(lines: string[]): string[] {
  return lines.map((line) => redactLine(line));
}
