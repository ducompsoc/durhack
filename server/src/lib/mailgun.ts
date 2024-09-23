import FormData from "form-data"
import Mailgun from "mailgun.js"

import { mailgunConfig } from "@/config"

const mailgun = new Mailgun(FormData)

const client = mailgun.client(mailgunConfig)
export default client
