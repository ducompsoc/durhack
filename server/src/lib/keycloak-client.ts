import assert from "node:assert/strict"
import KeycloakAdminClient from "@keycloak/keycloak-admin-client"
import type AdminClientUserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation"
import { type ClientMetadata, Issuer } from "openid-client"

import { keycloakConfig } from "@/config"
import { Group } from "@/decorators/authorise"
import { enumKeys, enumValues } from "@/lib/enum-keys"

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
let keycloakAdminClient = new KeycloakAdminClient({
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

keycloakAdminClient = await getKeycloakAdminClient()
const rawGroupHierarchyResponse = await keycloakAdminClient.groups.find()
const groupIds = new Map<Group, string>()
for (const rawGroup of rawGroupHierarchyResponse) {
  if (!rawGroup.path || !rawGroup.id) continue
  groupIds.set(rawGroup.path as Group, rawGroup.id)
}
for (const group of enumValues(Group)) {
  if (groupIds.has(group)) continue
  throw new Error(`Didn't find a group ID for ${group}`)
}

export function getKeycloakGroupId(group: Group): string {
  const id = groupIds.get(group)
  if (id) return id
  throw new Error(`Something has gone badly wrong, I don't know the group ID for ${group}`)
}

export type KeycloakUserInfo = {
  groups: string[]
  first_names: string
  preferred_names?: string | undefined
  last_names: string
  email: string
  phone_number?: string | undefined
  pronouns?: undefined | "he/him" | "she/her" | "they/them" | "xe/xem" | "Please Ask"
}

export type { AdminClientUserRepresentation }

export function unpackAttribute<T extends string = string>(
  userRepresentation: AdminClientUserRepresentation,
  attributeName: string,
): T | undefined
export function unpackAttribute<T = string>(
  userRepresentation: AdminClientUserRepresentation,
  attributeName: string,
  defaultValue: T,
): T
export function unpackAttribute<T = string>(
  userRepresentation: AdminClientUserRepresentation,
  attributeName: string,
  defaultValue: T | undefined = undefined,
): T | undefined {
  return userRepresentation.attributes?.[attributeName]?.[0] ?? defaultValue
}
