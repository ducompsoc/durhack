import { App } from "@otterhttp/app"
import { authenticate } from "@/middleware/authenticate"
import { forbiddenOrUnauthorised } from "@/middleware/forbidden-or-unauthorised"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import type { Request } from "@/request"
import type { Response } from "@/response"
import { walletHandlers } from "@/wallet/wallet-handlers"

export const walletApp = new App<Request, Response>()

walletApp
  .route("/apple")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(walletHandlers.getAppleWalletPass())
  .all(forbiddenOrUnauthorised())

walletApp
  .route("/google")
  .all(methodNotAllowed(["GET"]))
  .all(authenticate())
  .get(walletHandlers.getGoogleWalletJwt())
  .all(forbiddenOrUnauthorised())
