function groupPromiseSettledResultsByStatus<T>(results: PromiseSettledResult<T>[]) {
  const grouped = Object.groupBy<"fulfilled" | "rejected", PromiseSettledResult<T>>(results, (result) => result.status)
  grouped.fulfilled ??= []
  grouped.rejected ??= []
  return grouped as {
    fulfilled: PromiseFulfilledResult<T>[]
    rejected: { status: "rejected", reason: unknown }[]
  }
}
