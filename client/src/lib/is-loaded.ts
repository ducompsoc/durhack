/**
 * SWR helper function - allows the typescript type checker to realise that data variables are not undefined
 * when we have checked <code>isLoading</code> is truthy.
 *
 * When the <code>dataError</code> parameter is provided and not null-ish, it will be thrown.
 */
export function isLoaded<T>(data: T | undefined, dataIsLoading: boolean, dataError?: unknown): data is T {
  if (dataError != null) throw dataError
  return !dataIsLoading
}
