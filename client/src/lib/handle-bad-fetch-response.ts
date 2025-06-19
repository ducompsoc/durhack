import type { Toast, Toaster } from "@durhack/web-components/hooks/use-toast"

export async function handleBadResponse({
  response,
  toast,
  fallbackToast,
}: {
  response: Response
  toast: Toaster
  fallbackToast: Toast
}) {
  const data: unknown = await response.json()
  if (typeof data !== "object" || data == null || Array.isArray(data)) {
    toast(fallbackToast)
    return
  }

  if (!Object.hasOwn(data, "detail") || typeof data.detail !== "string") {
    toast(fallbackToast)
    return
  }

  toast({
    description: data.detail,
    variant: "destructive",
  })
  return
}
