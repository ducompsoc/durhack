import { Request as OtterRequest } from "@otterhttp/app"
import type { Prisma } from "@prisma/client"
import type { TokenSet as ClientTokenSet, UserinfoResponse } from "openid-client"

import type { KeycloakUserInfo } from "@/lib/keycloak-client"

export class Request extends OtterRequest<never> {
  user?: Prisma.UserGetPayload<{ include: { tokenSet: true } }>
  userTokenSet?: ClientTokenSet
  userProfile?: UserinfoResponse<KeycloakUserInfo>

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
