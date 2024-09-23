import type { NextFunction } from "@otterhttp/app"
import { ClientError, HttpError, HttpStatus, ServerError } from "@otterhttp/errors"
import { Prisma } from "@prisma/client"
import { ZodError } from "zod"

import { NullError, ValueError } from "@/lib/errors"
import { sendHttpErrorResponse, sendZodErrorResponse } from "@/lib/response"
import type { Request, Response } from "@/types"

export function apiErrorHandler(error: Error, _request: Request, response: Response, next: NextFunction) {
  if (response.headersSent) {
    return next(error)
  }

  if (error instanceof HttpError) {
    return sendHttpErrorResponse(response, error)
  }

  if (error instanceof ZodError) {
    return sendZodErrorResponse(response, error)
  }

  if (error instanceof ValueError) {
    return sendHttpErrorResponse(response, new ClientError(error.message, { statusCode: HttpStatus.BadRequest }))
  }

  if (error instanceof NullError) {
    return sendHttpErrorResponse(response, new ClientError(error.message, { statusCode: HttpStatus.NotFound }))
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error(error)

    const httpError = new ClientError("Something failed database client validation.", {
      statusCode: HttpStatus.BadRequest,
    })
    return sendHttpErrorResponse(response, httpError)
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let httpError: HttpError | undefined
    // unique constraint failed
    if (error.code === "P2002") {
      httpError = new ClientError(error.message, { statusCode: HttpStatus.Conflict })
    }

    // foreign key constraint failed
    if (error.code === "P2003") {
      httpError = new ClientError(error.message, { statusCode: HttpStatus.Conflict })
    }

    httpError ??= new ClientError(error.message)

    return sendHttpErrorResponse(response, httpError)
  }

  console.error("Unexpected API error:")
  console.error(error.stack)
  return sendHttpErrorResponse(response, new ServerError())
}
