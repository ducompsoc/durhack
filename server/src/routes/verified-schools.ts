import { App } from "@tinyhttp/app"
import { cors } from "@tinyhttp/cors"

import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const verifiedSchoolsRoutesApp = new App()

const schoolNameRegex = new RegExp('^"?(.+)"?$', 'gm')

verifiedSchoolsRoutesApp
  .route("/")
    .all(methodNotAllowed(["OPTIONS", "GET"]))
    .options(cors())
    .get(async function (req, res): Promise<void>{
      const response = await fetch("https://github.com/MLH/mlh-policies/raw/main/schools.csv",)
      const body = await response.text()
      const matches = body.matchAll(schoolNameRegex)
      matches.next() // ignore the header line
      const schoolOptions = Array.from(matches)
        .map(match => match[1])
        .map(schoolName => ({ label: schoolName, value: schoolName }))

      res.json(schoolOptions)
    })
