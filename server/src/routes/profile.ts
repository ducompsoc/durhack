//WIP
import { App } from "@tinyhttp/app";
import { Prisma } from "@prisma/client"
import { cors } from "corstisol"
import { json } from "milliparsec"
import { ZodError, set, z } from "zod"
import createHttpError from "http-errors";

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"

export const profileRoutesApp = new App()

const userFlagSchema = z.object({
  userFlags: z.object({}).catchall(z.boolean())
})

const legalFlagNames = new Set(["attendance", "mlhCodeOfConduct", "mlhPolicies", "mlhMarketing"])

profileRoutesApp.use(json());

profileRoutesApp
  .route("/:user_id")
  .all(methodNotAllowed(["OPTIONS", "GET"]))
  .options(cors())
  .get(async (req, res): Promise<void> =>{
    const userId = req.params.user_id as string;
    const userInfo = await prisma.userInfo.findUnique({
      where: {
        userId: userId
      }
    })
    res.status(200).json(userInfo)
  })

  .route("/flags")
  .all(methodNotAllowed(["OPTIONS","PUT","GET","PATCH"]))
  .options(cors())
  .patch(async(req,res):Promise<void>=>{
    const validatedPayload = userFlagSchema.parse(req.body)
    const flags = validatedPayload.userFlags;

    const userId = req.params.user_id;

    const removeFlagQuery = (flagName: string) => {
      return prisma.userFlag.deleteMany({
        where:{
            userId: userId,
            name: flagName
          }
      })
    } 
    
    const setFlagQuery = (flagName: string) => {
      return prisma.userFlag.upsert(
        {
          where:{
            id:{
              userId: userId,
              name: flagName
            }
          },
          create:{
            userId: userId,
            name: flagName
          },
          update:{}
        }
      )
    }
    
    const operations = Object.keys(flags).map((flagName) => {
      if(legalFlagNames.has(flagName)){
        if (flags[flagName]) 
          return setFlagQuery(flagName)
        else
          return removeFlagQuery(flagName)
      }else throw new createHttpError.BadRequest
    })

    await prisma.$transaction(operations)
    res.sendStatus(200)
  })
  
  .get(async(req,res):Promise<void>=>{
      const userId = req.params.user_id as string;
      const specificUserFlags = await prisma.user.findUnique({
        where:{
          keycloakUserId:userId
        }
      }).userFlags()
      if(specificUserFlags != null){
        const userFlagArray = specificUserFlags.map(flag => flag.name);
        res.status(200).json(userFlagArray)
      }
  })