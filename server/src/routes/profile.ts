//WIP
import { App } from "@tinyhttp/app";
import { Prisma } from "@prisma/client"
import { cors } from "corstisol"
import { json } from "milliparsec"

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const profileRoutesApp = new App()
profileRoutesApp.use(json());

profileRoutesApp
  .route("/")
  .all(methodNotAllowed(["OPTIONS", "GET", "PATCH"]))
  .options(cors())
  .get(async (req, res): Promise<void> =>{
    try{
      const uid = req.query.userId as string;
      const uInfo = await prisma.userInfo.findUnique({
        where: {
          userId: uid,
        },
      })
      res.status(200).json(uInfo)
    }catch(error){
      res.sendStatus(400) // refuse to elaborate :3
      return
    }
  })
  .route("/update-attendance")
  .patch(async (req,res): Promise<void> =>{
      try{
        const uid = req.body.userId;

        await prisma.$executeRaw`
          UPDATE "UserInfo"
          SET attendance = NOT attendance
          WHERE user_id::text = ${uid};
        `;

        res.sendStatus(200)
      }catch(error){
        res.sendStatus(400)
        return
      }
  })