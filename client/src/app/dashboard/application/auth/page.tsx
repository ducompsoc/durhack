import { Button } from "@durhack/web-components/ui/button"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"

export default function AuthPage() {
  const signOutUri = new URL("/auth/keycloak/logout", siteConfig.apiUrl).toString()

  return (
    <div>
      <h2 className="text-2xl">Authentication</h2>
      <div className="bg-secondary/10 py-8 px-32 rounded-md mb-8 mt-2 flex flex-col justify-center items-center gap-4">
        <Button className="p-4 bg-success hover:bg-success/90 text-success-foreground min-w-fit" asChild>
          <a href={siteConfig.authUrl} className="underline" target="_blank" rel="noreferrer">
            <span>DurHack Auth</span> <ExternalLinkIcon className="ml-1" />
          </a>
        </Button>

        <Button className="p-4 min-w-fit" asChild>
          <a href={signOutUri}>Sign Out</a>
        </Button>
      </div>
    </div>
  )
}
