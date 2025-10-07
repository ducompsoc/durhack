import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { type ParseArgsConfig, parseArgs } from "node:util"
import { z } from "zod/v4"

import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { MailgunMailer } from "@/lib/mailer"
import { generateUserInfo } from "@/lib/user-info-async-generator"
import { loadUserInfoQueryArgs } from "@/mailer/queries"
import { loadTemplate } from "@/mailer/templates"
import { MailingWritable } from "./mailing-writable"

//region program argument parsing
const programArgsConfig = {
  options: {
    template: {
      short: "t",
      type: "string",
      multiple: false,
    },
    query: {
      short: "q",
      type: "string",
      multiple: false,
    },
  },
} as const satisfies ParseArgsConfig

const programOptionsSchema = z.object({
  template: z.string({
    error: (issue) => {
      if (issue.input == null) return "Missing required `--template [name]` option"
      return "`--template [name]` should provide the name (with no file extension) of a template in the 'templates' directory"
    },
  }),
  query: z.string({
    error: (issue) => {
      if (issue.input == null) return "Missing required `--query [name]` option"
      return "`--query [name]` should provide the name (with no file extension) of a query in the 'queries/user-info' directory"
    },
  }),
})

type ProgramOptions = z.output<typeof programOptionsSchema>

function parseProgramArgs(): ProgramOptions {
  const result = parseArgs(programArgsConfig)
  return programOptionsSchema.parse(result.values)
}
//endregion

async function main() {
  const { template: templateSlug, query: querySlug } = parseProgramArgs()
  const mailer = new MailgunMailer()

  const [template, query] = await Promise.all([loadTemplate(templateSlug), loadUserInfoQueryArgs(querySlug)])

  const userInfoReadable = Readable.from(generateUserInfo(query))
  const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
  const mailingWritable = new MailingWritable(mailer, template)

  await pipeline(userInfoReadable, userInfoAugmentingTransform, mailingWritable)
  const mailedCount = mailingWritable.sentMailCount
  console.log(`Sent ${mailedCount} emails`)
}

if (import.meta.main) await main()
