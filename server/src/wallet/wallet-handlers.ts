import { onlyKnownUsers } from "@/decorators/authorise"
import type { Middleware } from "@/types"

class WalletHandlers {
  @onlyKnownUsers()
  getAppleWalletPass(): Middleware {
    return async (_request, response) => {
      response.sendStatus(200)
    }
  }

  @onlyKnownUsers()
  getGoogleWalletJwt(): Middleware {
    return async (_request, response) => {
      response.sendStatus(200)
    }
  }
}

const walletHandlers = new WalletHandlers()
export { walletHandlers }
