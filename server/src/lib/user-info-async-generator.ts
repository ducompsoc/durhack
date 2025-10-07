import type { Prisma } from "@prisma/client"

import { prisma, type UserInfo } from "@/database"

export type GenerateUserInfoArgs = Pick<Prisma.UserInfoFindManyArgs, "select" | "where" | "orderBy">

type OrderBy = GenerateUserInfoArgs["orderBy"]
function concatOrderBy(first: OrderBy, second: OrderBy ): OrderBy {
  if (first == null) return second
  if (second == null) return first
  const orderBy: OrderBy = []
  Array.isArray(first) ? orderBy.push(...first) : orderBy.push(first)
  Array.isArray(second) ? orderBy.push(...second) : orderBy.push(second)
  return orderBy
}

type Where = GenerateUserInfoArgs["where"]
function ensureCursorIncluded(where: Where): (cursor: string | null | undefined) => Where {
  if (where == null || Object.keys(where).length === 0) return () => undefined
  const newWhere = { "OR": [{ userId: "" }, where] } satisfies Where
  return (cursor) => {
    if (cursor == null) return where
    newWhere.OR[0].userId = cursor
    return newWhere
  }
}

/**
 * Generate UserInfo using the provided Prisma query, with the intent to email each.
 * This **cannot** be used for sending email to applicants that have not submitted applications;
 * for that purpose, an implementation would need to iterate through the Keycloak admin API's 'list users'
 * endpoint.
 */
export async function* generateUserInfo({
  select, where, orderBy,
}: GenerateUserInfoArgs = {}): AsyncGenerator<UserInfo[], undefined> {
  if (select) select.userId = true
  const getWhere = ensureCursorIncluded(where)
  const concatenatedOrderBy = concatOrderBy(orderBy, { userId: "asc" })

  let cursor: string | undefined

  do {
    const results = await prisma.userInfo.findMany({
      select: select,
      take: 10,
      skip: cursor == null ? 0 : 1,
      cursor: cursor == null ? undefined : { userId: cursor },
      where: getWhere(cursor),
      orderBy: concatenatedOrderBy,
    })

    cursor = results[9]?.userId
    console.log(`query returned ${results.length}, cursor is ${cursor}`)
    yield results
  } while (cursor != null)
}
