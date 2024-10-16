import { Response as OtterResponse } from "@otterhttp/app"
import { isValidStatusCode, statusMessages } from "@otterhttp/errors"

import { isObject } from "@/lib/type-guards"
import type { JSONLiteral, Request } from "@/types"

export class Response<Req extends Request = Request> extends OtterResponse<Req> {
  sessionDirty: boolean

  constructor(request: Req) {
    super(request)
    this.sessionDirty = false
  }

  override sendStatus(statusCode: number): this {
    this.statusCode = statusCode

    // Object.hasOwn(..., "data") -> true, but JSON.stringify() will omit properties with 'undefined' values
    this.json({
      data: undefined,
    })

    return this
  }

  override json(body: JSONLiteral | undefined): this {
    if (isValidStatusCode(this.statusCode)) {
      this.statusMessage ??= statusMessages[this.statusCode]
    }

    if (isObject(body) && Object.hasOwn(body, "data")) {
      body.status ??= this.statusCode
      body.message ??= this.statusMessage
    }

    if (body === undefined) {
      body = {
        status: this.statusCode,
        message: this.statusMessage,
      }
    }

    super.json(body)
    return this
  }
}
