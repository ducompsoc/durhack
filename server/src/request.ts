import { Request as OtterRequest } from "@otterhttp/app"

export class Request extends OtterRequest {
  get origin() {
    return `${this.protocol}://${this.host}`
  }

  get host() {
    if (this.port) return `${this.hostname}:${this.port}`
    return this.hostname
  }

  get href() {
    return `${this.origin}${this.url}`
  }
}
