import assert from "node:assert/strict"
import { z } from "zod";
import { ClientError } from "@otterhttp/errors";
import {fileTypeFromBuffer} from 'file-type';

import type { Middleware } from "@/types"
import { getKeycloakAdminClient } from "@/lib/keycloak-client"
import { prisma } from "@/database"
import "@/lib/zod-phone-extension"
import "@/lib/zod-iso3-extension"

const personalFormSchema = z.object({
  firstNames: z.string().trim().min(1).max(256),
  lastNames: z.string().trim().min(1).max(256),
  preferredNames: z.string().trim().min(1).max(256),
  pronouns: z.enum([
    "pnts",
    "he/him",
    "she/her",
    "they/them",
    "xe/xem",
    "other"
  ]),
  age: z.coerce.number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
});

const contactFormSchema = z.object({
  phone: z.string().phone(),
});

const educationFormSchema = z.object({
  university: z.string(),
  graduation: z.coerce.number({ invalid_type_error: "Please provide a valid year." })
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
});

const submitFormSchema = z.object({
  mlhCode: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhTerms: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhMarketing: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
});

const cvFormSchema = z.object({
  cv: z.boolean({ invalid_type_error: "Please choose yes or no!" })
});

const applicationSchema = personalFormSchema
  .merge(contactFormSchema)
  .merge(educationFormSchema)
  .merge(submitFormSchema)
  .merge(cvFormSchema)

type ParsedHeaders = {
    'content-type'?: any | undefined;
    'content-disposition'?: any | undefined;
};

type ParsedFormFieldFile = {
    filename: string;
    headers: ParsedHeaders;
    content: Buffer;
};

class ApplicationHandlers {
  async loadApplication(userId: string) {
    const adminClient = await getKeycloakAdminClient()
    const userProfile = await adminClient.users.findOne({ id: userId })
    assert(userProfile)

    if (!userProfile.attributes) userProfile.attributes = {}
    for (let attribute of Object.keys(userProfile.attributes ?? {})) {
      if (userProfile.attributes[attribute].length) {
        userProfile.attributes[attribute] = userProfile.attributes[attribute][0]
      }
    }
    const { phone, preferredNames, pronouns, firstNames, lastNames } = userProfile.attributes ?? {}

    const user = await prisma.user.findUnique({
      where: { keycloakUserId: userId },
    })
    assert(user)

    return {
      email: userProfile.email,
      preferredNames: preferredNames ?? null,
      pronouns: pronouns ?? null,
      phone: phone ?? null,
      firstNames: firstNames ?? null,
      lastNames: lastNames ?? null,
      ...user
    }
  }

  getApplication(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const payload = await this.loadApplication(request.user.keycloakUserId)

      response.status(200)
      response.json({ status: response.statusCode, message: "OK", data: payload })
    }
  }

  patchPersonal(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = personalFormSchema.parse(request.body)

      const attributes = {
        firstNames: [ body.firstNames ],
        lastNames: [ body.lastNames ],
        preferredNames: [ body.preferredNames ],
        pronouns: [ body.pronouns ],
      }

      const adminClient = await getKeycloakAdminClient()
      const userProfile = await adminClient.users.findOne({ id: request.user.keycloakUserId })
      assert(userProfile)
      await adminClient.users.update(
        { id: request.user.keycloakUserId },
        {
          attributes: { ...userProfile.attributes, ...attributes  },
          email: userProfile.email,
          emailVerified: userProfile.emailVerified,
        }
      )

      await prisma.user.update({
        where: { keycloakUserId: request.user.keycloakUserId },
        data: { age: body.age }
      })

      response.status(200)
      response.json({ status: response.statusCode, message: "OK" })
    }
  }

  patchContact(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = contactFormSchema.parse(request.body)

      const attributes = {
        phone: [ body.phone ],
      }

      const adminClient = await getKeycloakAdminClient()
      const userProfile = await adminClient.users.findOne({ id: request.user.keycloakUserId })
      assert(userProfile)
      await adminClient.users.update(
        { id: request.user.keycloakUserId },
        {
          attributes: { ...userProfile.attributes, ...attributes  },
          email: userProfile.email,
          emailVerified: userProfile.emailVerified,
        }
      )

      response.status(200)
      response.json({ status: response.statusCode, message: "OK" })
    }
  }

  patchEducation(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = educationFormSchema.parse(request.body)

      await prisma.user.update({
        where: { keycloakUserId: request.user.keycloakUserId },
        data: body,
      })

      response.status(200)
      response.json({ status: response.statusCode, message: "OK" })
    }
  }

  readonly BYTES_LIMIT = 10 * 1024 * 1024
  readonly ALLOWED_FILES = ["doc", "docx", "pdf"]

  async validateFile(files: ParsedFormFieldFile[]) {
    if (files.length !== 1) return { valid: false }
    const file = files[0]

    if (file.content.byteLength > this.BYTES_LIMIT) return { valid: false }

    const split = file.filename.split(".")
    const extension = split[split.length - 1]
    const fileType = await fileTypeFromBuffer(file.content)
    const { type, subtype } = file.headers["content-type"]
    const mime = `${type}/${subtype}`
    file.headers["content-type"] = mime

    if (mime !== fileType?.mime) return { valid: false }
    if (extension !== fileType?.ext) return { valid: false }
    if (!this.ALLOWED_FILES.includes(extension)) return { valid: false }

    return { file, valid: true } 
  }

  patchCv(): Middleware {
    return async (request, response) => {
      assert(request.user)
      assert(request.body?.cv?.value?.content)

      const cv = request.body.cv.value.content.toString() === "true"
      const userId = request.user.keycloakUserId
      
      await prisma.$transaction(async (context) => {
        await context.user.update({
          where: { keycloakUserId: userId },
          data: { cv },
        })

        if (cv) {
          const { file, valid } = await this.validateFile(request.body.file.files)
          if (!valid) throw new ClientError("Invalid file!")
          assert(file)

          const data = {
            userId,
            filename: file.filename,
            contentType: file.headers["content-type"]!,
            content: file.content,
          }

          await context.userCV.upsert({
            where: { userId },
            update: data,
            create: data,
          })
        }
      })

      response.status(200)
      response.json({ status: response.statusCode, message: "OK" })
    }
  }

  async applicationComplete(userId: string, body: any) {
    let application = await this.loadApplication(userId)
    application = { ...application, ...body }

    if (!applicationSchema.safeParse(application).success) return false
    if (application.applicationStatus !== "INCOMPLETE") return false

    return true
  }

  submit(): Middleware {
    return async (request, response) => {
      assert(request.user)

      const body = submitFormSchema.parse(request.body)

      if (!(await this.applicationComplete(
        request.user.keycloakUserId,
        body
      ))) {
        throw new ClientError("Application incomplete!")
      }

      await prisma.user.update({
        where: { keycloakUserId: request.user.keycloakUserId },
        data: { ...body, applicationStatus: "SUBMITTED" },
      })

      response.status(200)
      response.json({ status: response.statusCode, message: "OK" })
    }
  }
}

const applicationHandlers = new ApplicationHandlers()
export { applicationHandlers }
