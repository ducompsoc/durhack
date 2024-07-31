import type { Request, Response } from "@tinyhttp/app"

export type Middleware = (req: Request, res: Response, next: () => void) => Promise<void> | void
