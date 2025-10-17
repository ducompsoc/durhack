import { FetchError } from "@/error/fetch-error"
import {templateProp, template} from "@/util/template"

export async function ensureResponseMediaType(mediaType: string, response: Response, requestInit: RequestInit | null | undefined = undefined): Promise<void> {
  const contentType = FetchError.getResponseContentType(response)

  if (contentType === null) {
    const options = await FetchError.populateOptions({
      code: "ERR_NO_CONTENT_TYPE",
      response,
      requestInit,
      responseContentType: contentType,
    })
    throw new FetchError(template`${templateProp("response")} missing Content-Type header`, options)
  }

  if (mediaType !== contentType.mediaType) {
    const options = await FetchError.populateOptions({
      code: "ERR_WRONG_CONTENT_TYPE",
      response,
      requestInit,
      responseContentType: contentType,
    })
    throw new FetchError(template`Expected ${templateProp("response")} media type to be ${mediaType}, got ${contentType.mediaType}`, options)
  }
}
