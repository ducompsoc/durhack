import { Response as OtterResponse } from "@otterhttp/app"

import type { Request } from "./request"

export class Response<Req extends Request = Request> extends OtterResponse<Req> {}
