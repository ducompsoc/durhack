import path from "node:path"
import { tsImport } from "tsx/esm/api"

import { projectDirname } from "@/dirname"
import { hasObjectDefaultExport } from "@/lib/type-guards"
import type { GenerateUserInfoArgs } from "@/lib/user-info-async-generator"
import type { UnknownObject } from "@/types"

const queriesDirectory = path.resolve(projectDirname, "queries")
const userInfoQueriesDirectory = path.resolve(queriesDirectory, "user-info")

export async function loadUserInfoQueryArgs(querySlug: string): Promise<GenerateUserInfoArgs> {
  const queryFilePath = path.resolve(userInfoQueriesDirectory, `${querySlug}.ts`)
  const queryModule: unknown = await tsImport(queryFilePath, import.meta.url)
  if (!hasObjectDefaultExport(queryModule))
    throw new Error(`Module ${path} does not \`export default\` a metadata object`)
  return queryModule.default satisfies UnknownObject as GenerateUserInfoArgs
}
