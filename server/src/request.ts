import { Request as OtterRequest } from "@otterhttp/app"
import type { Prisma } from "@prisma/client"
import type { TokenSet as ClientTokenSet, UserinfoResponse } from "openid-client"
import { stringify } from "node:querystring";

import type { KeycloakUserInfo } from "@/lib/keycloak-client"

export class Request extends OtterRequest<never> {
  user?: Prisma.UserGetPayload<{ include: { tokenSet: true } }>
  userTokenSet?: ClientTokenSet
  userProfile?: UserinfoResponse<KeycloakUserInfo>

  private _queryString?: string

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

  get queryString(): string {
    if (this._queryString != null) return this._queryString
    let queryString = stringify(this.query)
    if (queryString !== "") queryString = `?${queryString}`
    return this._queryString = queryString
  }

  get pathnameWithoutTrailingSlash(): string {
    if (!this.pathname.endsWith("/")) return this.pathname
    return this.pathname.slice(0, -1)
  }
}
