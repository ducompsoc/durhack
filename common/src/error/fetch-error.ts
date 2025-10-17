import ModuleError from "module-error"
import { ContentType } from "@otterhttp/content-type"

import type {StringTemplate} from "@/util/template"
import {isString} from "@/util/type-guards"

type ModuleErrorOptions = ConstructorParameters<typeof ModuleError>[1];
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
    if (options.responseContentType === undefined) options.responseContentType = this.getResponseContentType(options.response)
    if (options.responseText === undefined && options.responseContentType?.isPlainText())
      options.responseText = await options.response.text()

    return options
  }

  constructor(message: string | StringTemplate, options?: FetchErrorOptions) {
    const messageIsTemplate = !isString(message)
    const superMessage = messageIsTemplate ? "" : message
    const superOptions = options ?? {}
    superOptions.code ??= "ERR_FETCH_UNKNOWN" // 'unknown fetch error' - the word ordering is to conform to Node.js' convention for error codes
    super(superMessage, superOptions);

    if (options != null) {
      if (options.response !== undefined) this.response = options.response
      if (options.requestInit !== undefined) this.requestInit = options.requestInit
      if (options.responseContentType !== undefined) this.responseContentType = options.responseContentType
      if (options.responseText !== undefined) this.responseText = options.responseText
    }

    if (messageIsTemplate) {
      const fetchError = this
      this.message = message({
        get response(){ return fetchError.formatResponse() }
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
