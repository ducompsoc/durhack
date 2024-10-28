import { tsImport } from "tsx/esm/api"
import type { Adapter } from "zod-config"

export type ScriptAdapterProps = {
  path: string
  silent?: boolean
}

const ADAPTER_NAME = "script adapter"
const TS_EXT_REGEX = /\.m?ts$/ // `import()` doesn't support commonJS so we don't allow .cjs

const importWithTypescriptFallback = async (path: string): Promise<unknown> => {
  // attempt standard import()
  try {
    return await import(path)
  } catch (err) {
    // throw if the file extension does not obviously hint that the file is TypeScript
    if (!TS_EXT_REGEX.test(path)) throw err
  }

  return await tsImport(path, import.meta.url)
}

const isObject = (maybeObject: unknown): maybeObject is Record<string, unknown> => {
  if (typeof maybeObject !== "object") return false
  if (maybeObject === null) return false
  if (Array.isArray(maybeObject)) return false
  return true
}

const hasObjectDefaultExport = (maybeModule: unknown): maybeModule is { default: Record<string, unknown> } => {
  if (!isObject(maybeModule)) return false
  if (!Object.hasOwn(maybeModule, "default")) return false
  return isObject(maybeModule.default)
}

export const typescriptAdapter = ({ path, silent }: ScriptAdapterProps): Adapter => {
  return {
    name: ADAPTER_NAME,
    read: async () => {
      try {
        const module = await importWithTypescriptFallback(path)
        if (!hasObjectDefaultExport(module)) throw new Error(`Value imported from ${path} is not a module!`)

        return module.default
      } catch (error) {
        throw new Error(`Failed to import() script at ${path}: ${error instanceof Error ? error.message : error}`)
      }
    },
    silent,
  }
}
