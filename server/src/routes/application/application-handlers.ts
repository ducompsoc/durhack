import assert from "node:assert/strict"
import { parse as parsePath } from "node:path/posix"
import { ClientError } from "@otterhttp/errors"
import type { ContentType, ParsedFormFieldFile } from "@otterhttp/parsec"
import { fileTypeFromBuffer } from "file-type"
import { z } from "zod"

import { mailgunConfig } from "@/config"
import { prisma } from "@/database"
import { onlyKnownUsers } from "@/decorators/authorise"
import { json, multipartFormData } from "@/lib/body-parsers"
import { getKeycloakAdminClient } from "@/lib/keycloak-client"
import MailgunClient from "@/lib/mailgun"
import type { Middleware, Request } from "@/types"
import "@/lib/zod-phone-extension"
import "@/lib/zod-iso3-extension"

const personalFormSchema = z.object({
  firstNames: z.string().trim().min(1).max(256),
  lastNames: z.string().trim().min(1).max(256),
  preferredNames: z.string().trim().min(1).max(256).optional(),
  pronouns: z.enum(["pnts", "he/him", "she/her", "they/them", "xe/xem", "other"]),
  age: z
    .number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
})

const contactFormSchema = z.object({
  phone: z.string().phone(),
})

const educationFormSchema = z.object({
  university: z.string(),
  graduation: z.coerce
    .number({ invalid_type_error: "Please provide a valid year." })
    .positive("Please provide a valid year.")
    .int("Oh, come on. Really?")
    .min(1900, { message: "Be serious. You didn't graduate before 1900." }),
  levelOfStudy: z.enum([
    "less-than-secondary",
    "secondary",
    "undergraduate-2-year",
    "undergraduate-3-or-more-years",
    "graduate",
    "bootcamp",
    "vocational-or-apprenticeship",
    "post-doctorate",
    "other",
    "not-a-student",
    "prefer-not-to-answer",
  ]),
  country: z.string().iso3(),
})

const submitFormSchema = z.object({
  mlhCode: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhTerms: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhMarketing: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
})

const cvUploadSchema = z.object({
  cvUploadChoice: z.object({
    type: z.literal("field-value"),
    value: z.object({
      headers: z.object({
        "content-type": z
          .custom<ContentType>()
          .refine((value) => value.mediaType === "text/plain")
          .optional(),
      }),
      content: z
        .instanceof(Buffer)
        .transform((value) => value.toString())
        .pipe(z.enum(["upload", "noUpload", "remind"])),
    }),
  }),
  cvFile: z
    .object({
      type: z.literal("field-file-list"),
      files: z.array(z.custom<ParsedFormFieldFile>()).length(1),
    })
    .optional(),
})

class ApplicationHandlers {
  private async loadApplication(request: Request) {
    assert(request.userProfile)

    const userDetails = await prisma.userInfo.findUnique({
      where: { userId: request.userProfile.sub },
    })

    const {
      phone_number,
      preferred_names: preferredNames,
      pronouns,
      first_names: firstNames,
      last_names: lastNames,
    } = request.userProfile

    return {
      keycloakUserId: request.userProfile.sub satisfies string,
      email: request.userProfile.email satisfies string,
      preferredNames: preferredNames ?? null,
      pronouns: pronouns ?? (null satisfies string | null),
      phone: phone_number ?? (null satisfies string | null),
      firstNames: firstNames satisfies string,
      lastNames: lastNames satisfies string,
      applicationStatus: userDetails?.applicationStatus ?? "unsubmitted",
      cvUploadChoice: userDetails?.cvUploadChoice ?? "indeterminate",
      age: userDetails?.age ?? null,
      university: userDetails?.university ?? null,
      graduationYear: userDetails?.graduationYear ?? null,
      levelOfStudy: userDetails?.levelOfStudy ?? null,
      countryOfResidence: userDetails?.country ?? null,
    }
  }

  @onlyKnownUsers()
  getApplication(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const payload = await this.loadApplication(request)

      response.status(200)
      response.json({ data: payload })
    }
  }

  @onlyKnownUsers()
  patchPersonal(): Middleware {
    return async (request, response) => {
      assert(request.user)
      assert(request.userProfile)

      const body = await json(request, response)
      const payload = personalFormSchema.parse(body)

      const attributes = {
        firstNames: [payload.firstNames],
        lastNames: [payload.lastNames],
        preferredNames: [payload.preferredNames],
        pronouns: [payload.pronouns],
      }

      const adminClient = await getKeycloakAdminClient()
      const userProfile = await adminClient.users.findOne({ id: request.user.keycloakUserId })
      assert(userProfile)
      await adminClient.users.update(
        { id: request.user.keycloakUserId },
        {
          attributes: { ...userProfile.attributes, ...attributes },
          email: userProfile.email,
          emailVerified: userProfile.emailVerified,
        },
      )

      await prisma.userInfo.update({
        where: { userId: request.user.keycloakUserId },
        data: { age: payload.age },
      })

      response.sendStatus(200)
    }
  }

  @onlyKnownUsers()
  patchContact(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = await json(request, response)
      const payload = contactFormSchema.parse(body)

      const attributes = {
        phone: [payload.phone],
      }

      const adminClient = await getKeycloakAdminClient()
      // https://github.com/keycloak/keycloak/issues/19691
      const userProfile = await adminClient.users.findOne({ id: request.user.keycloakUserId })
      assert(userProfile)
      await adminClient.users.update(
        { id: request.user.keycloakUserId },
        {
          attributes: { ...userProfile.attributes, ...attributes },
          email: userProfile.email,
          emailVerified: userProfile.emailVerified,
        },
      )

      response.sendStatus(200)
    }
  }

  @onlyKnownUsers()
  patchEducation(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = await json(request, response)
      const payload = educationFormSchema.parse(body)

      await prisma.user.update({
        where: { keycloakUserId: request.user.keycloakUserId },
        data: payload,
      })

      response.sendStatus(200)
    }
  }

  readonly cvFileMaximumBytes = 10 * 1024 * 1024
  readonly cvAllowedFilenameExtensions = [".doc", ".docx", ".pdf"]

  private async validateCvFile(file: ParsedFormFieldFile): Promise<void> {
    if (file.content.byteLength > this.cvFileMaximumBytes)
      throw new ClientError(`File's size exceeds the allowed maximum size (10MB)`)

    const { ext: extension } = parsePath(file.filename)
    if (!this.cvAllowedFilenameExtensions.includes(extension))
      throw new ClientError(`Invalid file extension: ${extension}. Only '.doc', '.docx', '.pdf' are permitted`)

    const fileType = await fileTypeFromBuffer(file.content)
    const mime = file.headers["content-type"]?.mediaType ?? "text/plain"

    if (fileType == null)
      throw new ClientError(`File's content could not be inferred. Plaintext files are not permitted`)

    if (extension.slice(1) !== fileType.ext)
      throw new ClientError(
        `File's content does not match its file extension ${extension}. Expected file extension is .${fileType?.ext}`,
      )

    if (mime !== fileType.mime)
      throw new ClientError(`File's content does not match the claimed type ${mime}. Expected type ${fileType?.mime}`)
  }

  @onlyKnownUsers()
  patchCv(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = await multipartFormData(request, response)
      if (body == null) {
        throw new ClientError("Body must be multipart/form-data", {
          statusCode: 400,
          exposeMessage: true,
          expected: true,
        })
      }

      const payload = cvUploadSchema.parse(body)

      const cvUploadChoice = payload.cvUploadChoice.value.content
      const cvFile = payload.cvFile?.files[0]
      const userId = request.user.keycloakUserId

      if (cvUploadChoice !== "upload") {
        await prisma.$transaction([
          prisma.userInfo.update({
            where: { userId },
            data: { cvUploadChoice },
          }),
          prisma.userCV.deleteMany({
            where: { userId },
          }),
        ])
        response.sendStatus(200)
        return
      }

      if (cvFile == null) throw new ClientError("File must be provided when cvUploadChoice is 'upload'")
      await this.validateCvFile(cvFile)

      const cvFileData = {
        filename: cvFile.filename,
        // biome-ignore lint/style/noNonNullAssertion: validateCvFile method ensures this assertion is always correct
        contentType: cvFile.headers["content-type"]!.mediaType,
        content: cvFile.content,
      }

      await prisma.user.update({
        where: { keycloakUserId: userId },
        data: {
          userInfo: {
            update: {
              cvUploadChoice,
            },
          },
          userCv: {
            upsert: {
              update: cvFileData,
              create: cvFileData,
            },
          },
        },
      })

      response.sendStatus(200)
    }
  }

  /**
   * Throw (an {@link AggregateError} containing potentially multiple errors with helpful messages) when the
   * application belonging to the user that initiated <code>request</code> is incomplete.
   *
   * If this method does not throw, the user's application can be considered complete, and the user
   * should be permitted to submit their application (provided they have not already submitted it).
   */
  private async validateApplicationComplete(
    application: Awaited<ReturnType<typeof this.loadApplication>>,
  ): Promise<void> {
    const errors: Error[] = []

    // TODO: implement application completeness checking
    errors.push(new Error("Application completeness checking has not been fully implemented"))

    if (errors.length === 0) return
    throw new AggregateError(errors, "Application is incomplete")
  }

  @onlyKnownUsers()
  submit(): Middleware {
    return async (request, response) => {
      assert(request.userProfile)

      const body = await json(request, response)
      const payload = submitFormSchema.parse(body)

      const application = await this.loadApplication(request)

      if (application.applicationStatus !== "unsubmitted")
        throw new ClientError("Application has already been submitted", {
          statusCode: 400,
          code: "ERR_APPLICATION_ALREADY_SUBMITTED",
          exposeMessage: true,
          expected: true,
        })

      await this.validateApplicationComplete(application)

      // TODO: Create appropriate UserConsent records (in a transaction with the following query)

      await prisma.user.update({
        where: { keycloakUserId: request.userProfile.sub },
        data: { ...payload, userInfo: { update: { applicationStatus: "submitted" } } },
      })

      await MailgunClient.messages.create(mailgunConfig.domain, {
        from: `DurHack <noreply@${mailgunConfig.sendAsDomain}>`,
        "h:Reply-To": "hello@durhack.com",
        to: request.userProfile?.email,
        subject: "DurHack Application Submitted",
        html: [
          '<html lang="en-GB">',
          '<head><meta charset="utf-8"></head>',
          "<body>",
          `<p>Hi ${request.userProfile.preferred_names ?? request.userProfile.first_names}</p>,`,
          "<br/>",
          "<p>Thanks for applying to attend DurHack! Your application has been submitted successfully.</p>",
          '<p>You can view and update your responses at <a href="https://durhack.com/dashboard">durhack.com</a>.</p',
          "<br/>",
          '<p>If you have any questions, please reach out to <a href="mailto:hello@durhack.com">hello@durhack.com</a>.</p>',
          "<br/>",
          "<p>Thanks,</p>",
          "<p>The DurHack Team</p>",
          "</body>",
          "</html>",
        ].join("\n"),
      })

      response.sendStatus(200)
    }
  }
}

const applicationHandlers = new ApplicationHandlers()
export { applicationHandlers }
