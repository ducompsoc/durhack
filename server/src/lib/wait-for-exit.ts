import type { ChildProcess } from "node:child_process"

export function waitForExit(process: ChildProcess): Promise<void> {
  if (process.exitCode != null) return Promise.resolve()
  return new Promise((resolve, reject) => {
    process.on("exit", () => resolve())
  })
}
