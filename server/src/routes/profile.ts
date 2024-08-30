//WIP
import { App } from "@tinyhttp/app";
import { Prisma } from "@prisma/client"
import { cors } from "corstisol"
import { json } from "milliparsec"

import { prisma } from "@/database"
import { methodNotAllowed } from "@/middleware/method-not-allowed"
import { error } from "node:console";

export const profileRoutesApp = new App()
profileRoutesApp.use(json());

profileRoutesApp
  .route("/")
  .all(methodNotAllowed(["OPTIONS", "GET"]))
  .options(cors())
  .get(async (req, res): Promise<void> =>{
    try{
      const uid = req.query.userId as string;
      const uInfo = await prisma.userInfo.findUnique({
        where: {
          userId: uid
        }
      })
      res.status(200).json(uInfo)
    }catch(error){
      res.sendStatus(400) // refuse to elaborate :3
      return
    }
  })

  .route("/user-flags")
  .all(methodNotAllowed(["OPTIONS","PUT","GET"]))
  .options(cors())
  .put(async(req,res):Promise<void>=>{
    try{
      const uid = req.body.userId;
      const flags = req.body.userFlags;
      var failedFlags = [];

      for(const flag in flags){ //loop through each flag that needs to be set
        
        switch(flags[flag]){

          case true: //create flag
            try{
              await prisma.userFlag.create({
                data:{
                  userId: uid,
                  name: flag
                }
              });
            }catch(err){
                if(err instanceof Prisma.PrismaClientKnownRequestError){
                  if(err.code != "P2002"){ //p2002 in our case: we try to add something that already exists
                    failedFlags.push(flag)
                  }
                }
            }
          break;

          case false: //delete flag
            try{ 
              await prisma.userFlag.delete({
                where:{
                  id:{
                    userId: uid,
                    name: flag
                  }
                }
              });
            }catch(err){
              if(err instanceof Prisma.PrismaClientKnownRequestError){
                if(err.code != "P2025"){ //p2025 in our case: we try to delete something that doesnt exist
                  failedFlags.push(flag)
                }
              }
            }
          break;

          default: //toggle flag
            const foundFlag = await prisma.userFlag.findUnique({
              where:{
                id:{
                  userId: uid,
                  name: flag
                }
              }
            })

            if(foundFlag){
              await prisma.userFlag.delete({
                where:{
                  id:{
                    userId: uid,
                    name: flag
                  }
                }
              });
            }else{
              await prisma.userFlag.create({
                data:{
                  userId: uid,
                  name: flag
                }
              });
            }
          break;

        }
      }

      if(failedFlags.length != 0){
        res.status(200).json({ // unsure if this is the best way to handle it
          failed_flags: failedFlags
        })
      }else{
        res.sendStatus(200)
      }

    }catch(error){
      res.sendStatus(400)
      return
    }
  })
  
  .get(async(req,res):Promise<void>=>{
    try{
      const uid = req.query.userId as string;
      const uInfo = await prisma.userFlag.findMany({
        where:{
          userId:{
            equals: uid
          }
        }
      })
      res.status(200).json(uInfo)
    }catch(error){
      res.sendStatus(400) // refuse to elaborate :3
      return
    }
  })