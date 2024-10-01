import type { ConfigIn } from "@/config/schema"
import type { DeepPartial } from "@/types/deep-partial"

export default {
  origin: "https://api.durhack.com",
  frontendOrigin: "https://durhack.com",
  session: {
    cookie: {
      name: "__Secure-durhack-session",
      secure: true,
      /**
       * We have to use 'lax' because OAuth2 flow doesn't work with 'strict', it relies on
       * session cookies being sent when redirected back to the app from the authentication provider.
       *
       * We could try to do something clever:
       *  1. set sameSite "lax" on OAuth2 flow init
       *  2. upgrade to sameSite "strict" on OAuth2 flow callback
       *
       * The only problem with 'lax' is that it allows cross-site attacks.
       * We use robust CSRF mitigation (otterhttp/csrf-csrf) so using 'lax' doesn't matter too much.
       */
      sameSite: "lax",
      domain: ".durhack.com",
    },
  },
  keycloak: {
    realm: "durhack",
  },
} satisfies DeepPartial<ConfigIn>
