import assert from "node:assert/strict"
import { parse as parsePath } from "node:path/posix"
import { ClientError, HttpStatus } from "@otterhttp/errors"
import type { ContentType, ParsedFormFieldFile } from "@otterhttp/parsec"
import { fileTypeFromBuffer } from "file-type"
import { z } from "zod"
import type { Application, DietaryRequirement, TravelReimbursementForm } from "@durhack/durhack-common/types/application"
import { mailgunConfig } from "@/config"
import { prisma } from "@/database"
import { onlyKnownUsers } from "@/decorators/authorise"
import { json, multipartFormData } from "@/lib/body-parsers"
import { type KeycloakUserInfo, getKeycloakAdminClient } from "@/lib/keycloak-client"
import { mailgunClient } from "@/lib/mailgun"
import type { Middleware, Request } from "@/types"
import "@/lib/zod-phone-extension"
import "@/lib/zod-iso3-extension"




const travelReimbursementFormSchema = z.object({ 
    methodOfTravel: z.array(
    z.enum(["bus", "train", "private-road-vehicle", "international-transport", "other"], {
      message: "Please select a method of travel",
    })),
    //.transform(adaptmethodOfTravelToDatabase),
    receiptFiles: z
    .object({
      type: z.literal("field-file-list"),
      files: z.array(z.custom<ParsedFormFieldFile>())
      //.length(1),
    })
    //.optional(),
})

class TravelReimbursementFormHandlers {
  private async loadApplication(request: Request): (Promise<TravelReimbursementForm | null> ) {
    assert(request.userProfile)
    const userId =  request.userProfile.sub
    assert(userId)
    const travelReimbursementForm = await prisma.reimbursementForm.findFirst({
      where: { userId: request.userProfile.sub}
    })
    return travelReimbursementForm as any
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
}
const travelReimbursementFormHandlers = new TravelReimbursementFormHandlers()
export { travelReimbursementFormHandlers }