//WIP
import { App } from "@tinyhttp/app";
import { Prisma } from "@prisma/client"
import { cors } from "corstisol"
import { json } from "milliparsec"
import { ZodError, set, z } from "zod"

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import createHttpError from "http-errors";

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
    try{
      const userId = req.params.user_id as string;
      const uInfo = await prisma.userInfo.findUnique({
        where: {
          userId: userId
        }
      })
      res.status(200).json(uInfo)
    }catch(error){
      res.sendStatus(400) // refuse to elaborate :3
      return
    }
  })

  .route("/flags")
  .all(methodNotAllowed(["OPTIONS","PUT","GET","PATCH"]))
  .options(cors())
  .put(async(req,res):Promise<void>=>{
    try{
      const validatedPayload = userFlagSchema.parse(req.body)
      const flags = validatedPayload.userFlags;

      const userId = req.params.user_id;

      var trueFlags = [];
      var falseFlags = [];

      for(const flag in flags){
        if(!(legalFlagNames.has(flag))){
          throw new createHttpError.BadRequest()
        }else{
          if(flags[flag] === true){
            trueFlags.push(flag)
          }else{
            falseFlags.push(flag)
          }
        }
      }

      const upsertOperations = trueFlags.map(flagName=>{
        return prisma.userFlag.upsert({
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
        });
      });

      const deleteOperations = falseFlags.map(flagName=>{
        return prisma.userFlag.deleteMany({
          where:{
            userId: userId,
            name: flagName
          }
        });
      });

      const allOperations = [...upsertOperations, ...deleteOperations];
 
      await prisma.$transaction(allOperations)
      res.sendStatus(200)
    }catch(error){
      if(error instanceof ZodError){
        res.sendStatus(400) //do NOT elaborate
        return
      }
    }
  })
  
  .get(async(req,res):Promise<void>=>{
      const userId = req.params.user_id as string;
      const userInfo = await prisma.userFlag.findMany({
        where:{
          userId:{
            equals: userId
          }
        }
      })
      const userFlagArray = userInfo.map(flag => flag.name);
      res.status(200).json(userFlagArray)
  })