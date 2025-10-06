import { Readable } from "node:stream"
import { pipeline } from "node:stream/promises"
import { type ParseArgsConfig, parseArgs } from "node:util"
import { z } from "zod/v4"

import { KeycloakAugmentingTransform } from "@/lib/keycloak-augmenting-transform"
import { MailgunMailer } from "@/lib/mailer"
import { loadTemplate } from "@/mailer/templates"
import { MailingWritable } from "./mailing-writable"
import { generateUserInfo } from "./user-info-async-generator"

//region program argument parsing
const programArgsConfig = {
  options: {
    template: {
      short: "t",
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
})

type ProgramOptions = z.output<typeof programOptionsSchema>

function parseProgramArgs(): ProgramOptions {
  const result = parseArgs(programArgsConfig)
  return programOptionsSchema.parse(result.values)
}
//endregion

async function main() {
  const { template: templateSlug } = parseProgramArgs()
  const mailer = new MailgunMailer()

  const template = await loadTemplate(templateSlug)

  const userInfoReadable = Readable.from(
    generateUserInfo({
      where: {
        applicationStatus: "accepted",
      },
    }),
  )
  const userInfoAugmentingTransform = new KeycloakAugmentingTransform()
  const mailingWritable = new MailingWritable(mailer, template)

  await pipeline(userInfoReadable, userInfoAugmentingTransform, mailingWritable)
  const mailedCount = mailingWritable.sentMailCount
  console.log(`Sent ${mailedCount} emails`)
}

if (import.meta.main) await main()
