import { mkdir, realpath } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join as pathJoin, sep } from "node:path"
import { nanoid } from "nanoid/non-secure"

function generateApplicationInstanceTempDirName(): string {
  return `durhack-api-${nanoid(10)}${sep}`
}

export async function getTempDir(): Promise<string> {
  const applicationInstanceTempDirName = generateApplicationInstanceTempDirName()
  const applicationInstanceTempDirPath = pathJoin(await realpath(tmpdir()), applicationInstanceTempDirName)
  await mkdir(applicationInstanceTempDirPath, 0o700)
  return applicationInstanceTempDirPath
}
