import { siteConfig } from "@/config/site"

export async function updateApplication(path: string, body: unknown) {
  const url = new URL(`/application/${path}`, siteConfig.apiUrl).toString()

  const options: RequestInit = {
    method: path === "submit" ? "POST" : "PATCH",
    credentials: "include",
  }

  if (body instanceof FormData) {
    options.body = body
  } else {
    options.headers = {
      "Content-Type": "application/json",
    }
    options.body = JSON.stringify(body)
  }

  const res = await fetch(url, options)

  if (!res.ok) throw new Error("Failed to save application!")

  return await res.json()
}
