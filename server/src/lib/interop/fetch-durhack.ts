import { readFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { Agent, fetch } from "undici"
import type { RequestInfo, RequestInit, Response } from "undici"

import { durhackConfig } from "@/config"
import { projectDirname } from "@/dirname"

function resolveFilePath(filePath: string): string {
  if (filePath.startsWith("/")) return path.resolve(filePath)
  if (filePath.startsWith("~")) {
    const home = process.env.HOME
    if (!home) throw new Error("HOME is undefined, cannot resolve path relative to ~")
    return path.resolve(home, filePath)
  }
  return path.resolve(projectDirname, filePath)
}

const [certificate, certificateKey] = await Promise.all([
  readFile(resolveFilePath(durhackConfig.interopMutualTls.clientCertificateFile)),
  readFile(resolveFilePath(durhackConfig.interopMutualTls.clientCertificateKeyFile)),
])

const durhackAgent = new Agent({
  allowH2: true,
  connect: {
    cert: certificate,
    key: certificateKey,
  },
})

export async function fetchDurHack(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
  init ??= {}
  init.dispatcher = durhackAgent
  return await fetch(input, init)
}
