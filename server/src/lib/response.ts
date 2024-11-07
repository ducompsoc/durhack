import { STATUS_CODES } from "node:http"
import type { HttpError } from "@otterhttp/errors"
import type { ZodError } from "zod"

import type { Response } from "@/types"

type ResponseBody = {
  status: number
  message: string
  detail?: string | object
} & Record<string, unknown>

function makeHttpErrorResponseBody(error: HttpError): ResponseBody {
  const response_body: ResponseBody = {
    status: error.statusCode,
    message: error.statusMessage,
  }

  Object.assign(response_body, error.extra)

  if (error.exposeMessage && error.message && error.message !== response_body.message) {
    response_body.detail = error.message
  }

  if (error.exposeMessage && error.code) {
    response_body.error_code = error.code
  }

  return response_body
}

export function sendHttpErrorResponse(response: Response, error: HttpError): void {
  const response_body = makeHttpErrorResponseBody(error)
  response.status(error.statusCode).json(response_body)
}

function makeZodErrorResponseBody(error: ZodError): ResponseBody {
  return {
    status: 400,
    message: STATUS_CODES[400] as string,
    detail: { issues: error.issues },
    error_code: "ERR_VALIDATION_FAILED",
  }
}

export function sendZodErrorResponse(response: Response, error: ZodError): void {
  const response_body = makeZodErrorResponseBody(error)
  response.status(400).json(response_body)
}
