import { readFile } from "node:fs/promises"
import path from "node:path"
import handlebars from "handlebars"
import { z } from "zod/v4"

import { projectDirname } from "@/dirname"
import type { StringRecord } from "@/types"

//region loading templates
type ReadFileOptions = Parameters<typeof readFile>[1]
const plaintextReadFileOptions = { encoding: "utf-8" } as const satisfies ReadFileOptions

const messageTemplateDirectory = path.resolve(projectDirname, "templates")

export type TemplateRenderFunction<TRenderProps = unknown> = HandlebarsTemplateDelegate<TRenderProps>

export async function loadTemplateSource(templateSlug: string): Promise<string> {
  const templateFilePath = path.resolve(messageTemplateDirectory, `${templateSlug}.hbs`)
  return await readFile(templateFilePath, plaintextReadFileOptions)
}

const templateMetadataSchema = z.object({
  messageTitle: z.string(),
})

export type TemplateMetadata = z.output<typeof templateMetadataSchema>

export async function loadTemplateMetadata(templateSlug: string): Promise<TemplateMetadata> {
  const templateMetadataFilePath = path.resolve(messageTemplateDirectory, `${templateSlug}.meta.json`)
  const templateMetadata = await readFile(templateMetadataFilePath, plaintextReadFileOptions)
  return templateMetadataSchema.parse(templateMetadata)
}

export type Template<TRenderProps = unknown> = {
  render: TemplateRenderFunction<TRenderProps>
  simpleProps: TemplateSimplePropsRecord
  metadata: TemplateMetadata
}

export async function loadTemplate(templateSlug: string): Promise<Template> {
  const [source, metadata] = await Promise.all([loadTemplateSource(templateSlug), loadTemplateMetadata(templateSlug)])
  const render = handlebars.compile(source)
  const simpleProps = extractSimplePropsFromTemplate(source)
  return { render, simpleProps, metadata }
}
//endregion

//region extracting simple props from handlebars template
function handlebarsAstNodeIsMustacheStatement(node: hbs.AST.Node): node is hbs.AST.MustacheStatement {
  return node.type === "MustacheStatement"
}

function handlebarsAstNodeIsPathExpression(node: hbs.AST.Node): node is hbs.AST.PathExpression {
  return node.type === "PathExpression"
}

// https://github.com/handlebars-lang/handlebars.js/issues/1207#issuecomment-396882621
type TemplateSimplePropsRecord = StringRecord<true>

function extractSimplePropsFromTemplate(templateSource: string): TemplateSimplePropsRecord {
  const ast = handlebars.parse(templateSource)
  const keys: TemplateSimplePropsRecord = {}

  for (const node of ast.body) {
    if (!handlebarsAstNodeIsMustacheStatement(node)) continue
    if (!handlebarsAstNodeIsPathExpression(node.path)) continue
    keys[node.path.original] = true
  }
  return keys
}
//endregion
