import assert from "node:assert/strict"
import KeycloakAdminClient from "@keycloak/keycloak-admin-client"
import { type ClientMetadata, Issuer } from "openid-client"

import { keycloakConfig } from "@/config"

function adaptClientConfig(clientConfig: typeof keycloakConfig): ClientMetadata {
  return {
    client_id: clientConfig.clientId,
    client_secret: clientConfig.clientSecret,
    redirect_uris: clientConfig.redirectUris,
    response_types: clientConfig.responseTypes,
  } satisfies ClientMetadata
}

const keycloakIssuerUrl = new URL(`/realms/${keycloakConfig.realm}`, keycloakConfig.baseUrl)
export const keycloakIssuer = await Issuer.discover(keycloakIssuerUrl.toString())

const keycloakClientConfig = adaptClientConfig(keycloakConfig)
export const keycloakClient = new keycloakIssuer.Client(keycloakClientConfig)
const keycloakAdminClient = new KeycloakAdminClient({
  baseUrl: keycloakConfig.adminBaseUrl,
  realmName: keycloakConfig.realm,
})

async function fetchKeycloakClientCredentials() {
  return await keycloakClient.grant({
    grant_type: "client_credentials",
  })
}

let keycloakClientCredentials = await fetchKeycloakClientCredentials()

export async function getKeycloakClientCredentials() {
  if (!keycloakClientCredentials.expired()) return keycloakClientCredentials
  keycloakClientCredentials = await fetchKeycloakClientCredentials()
  return keycloakClientCredentials
}

export async function getKeycloakAdminClient() {
  const credentials = await getKeycloakClientCredentials()
  assert(credentials.access_token != null)
  keycloakAdminClient.setAccessToken(credentials.access_token)
  return keycloakAdminClient
}

export type KeycloakUserInfo = {
  groups: string[]
  first_names: string
  preferred_names?: string | undefined
  last_names: string
  email: string
  phone_number?: string | undefined
  pronouns?: string | undefined
}
