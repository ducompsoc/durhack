import { z } from "zod/v4"

export const templateMetadataSchema = z.object({
  messageTitle: z.string(),
})

export type TemplateMetadataIn = z.input<typeof templateMetadataSchema>
export type TemplateMetadata = z.output<typeof templateMetadataSchema>
