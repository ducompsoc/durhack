import { siteConfig } from "@/config/site";

export async function updateApplication(path: string, body: any) {
  const uri = new URL("/application/" + path, siteConfig.apiUrl).toString()

  const res = await fetch(uri, {
    method: path === "submit" ? "POST" : "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) throw new Error("Failed to save application!")

  return await res.json()
}