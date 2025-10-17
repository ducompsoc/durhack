import { ContentType } from "@otterhttp/content-type"
import ModuleError from "module-error"

import type { StringTemplate } from "@/util/template"
import { isString } from "@/util/type-guards"
import { pick } from "@/util/pick"

type ModuleErrorOptions = ConstructorParameters<typeof ModuleError>[1]
type FetchErrorOptions = ModuleErrorOptions & {
  /**
   * The {@link Response} object related to the error.
   */
  response?: Response

  /**
   * The {@link RequestInit} object passed to {@link fetch} which yielded {@link response}.
   */
  requestInit?: RequestInit | null | undefined

  /**
   * The parsed content-type of the response, if present.
   */
  responseContentType?: ContentType | null | undefined

  /**
   * The body of the response, if its content media type is plaintext.
   */
  responseText?: string | null | undefined
}

export class FetchError extends ModuleError {
  /**
   * The {@link Response} object related to the error.
   */
  response?: Response

  /**
   * A generated string which contains {@link response}'s status code and text.
   */
  responseStatus?: string | null | undefined

  /**
   * A generated object with a subset of {@link response}'s fields.
   */
  responseSummary?: Pick<Response, "status" | "statusText"> | null | undefined

  /**
   * The {@link RequestInit} object passed to {@link fetch} which yielded {@link response}.
   */
  requestInit?: RequestInit | null | undefined

  /**
   * The parsed content-type of the response, if present.
   */
  responseContentType?: ContentType | null | undefined

  /**
   * The body of the response, if its content media type is plaintext.
   */
  responseText?: string | null | undefined

  static getResponseContentType(response: Response): ContentType | null {
    const rawContentType = response.headers.get("content-type")
    if (rawContentType == null) return null
    return ContentType.parse(rawContentType)
  }

  static async populateOptions(options: FetchErrorOptions): Promise<FetchErrorOptions> {
    if (options.response == null) return options
    if (options.responseContentType === undefined)
      options.responseContentType = FetchError.getResponseContentType(options.response)
    if (options.responseText === undefined && options.responseContentType?.isPlainText())
      options.responseText = await options.response.text()

    return options
  }

  constructor(message: string | StringTemplate, options?: FetchErrorOptions) {
    const messageIsTemplate = !isString(message)
    const superMessage = messageIsTemplate ? "" : message
    const superOptions = options ?? {}
    superOptions.code ??= "ERR_FETCH_UNKNOWN" // 'unknown fetch error' - the word ordering is to conform to Node.js' convention for error codes
    super(superMessage, superOptions)

    const fetchError = this
    function setHidden(propertyKey: PropertyKey, value: unknown) {
      Object.defineProperty(fetchError, propertyKey, { value, enumerable: false })
    }

    if (options != null) {
      if (options.response !== undefined) setHidden("response", options.response)
      if (options.response != null) this.responseStatus = `${options.response.status} ${options.response.statusText}`
      if (options.response != null) this.responseSummary = pick(options.response, ["status", "statusText"])
      if (options.requestInit !== undefined) setHidden("requestInit", options.requestInit)
      if (options.responseContentType !== undefined) setHidden("responseContentType", options.responseContentType)
      if (options.responseText !== undefined) setHidden("responseText", options.responseText)
    }

    if (messageIsTemplate) {
      this.message = message({
        get response() {
          return fetchError.formatResponse()
        },
        status: fetchError.responseStatus,
      })
    }
  }

  formatResponse(): string {
    if (this.response == null) return "[Response unknown]"
    const httpVerb = this.requestInit?.method?.toUpperCase() ?? "GET"
    const url = this.response?.url
    return `[Response ${httpVerb} ${url}]`
  }
}
