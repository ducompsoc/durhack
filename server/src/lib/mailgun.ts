import FormData from "form-data"
import Mailgun from "mailgun.js"

import { mailgunConfig } from "@/config"

const mailgun = new Mailgun(FormData)

const mailgunClient = mailgun.client(mailgunConfig)
export { mailgunClient }
