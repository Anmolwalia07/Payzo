import { prisma } from "@repo/database";

export const loger=async(level:'info'|'warn'|'error',message:string,meta?:Record<string,any>)=>{
    try{
        await prisma.log.create({
            data:{
                level,
                message,
                meta
            }
        })
        console.log("Log write successfully")
    }catch(err){
        console.log("Log write fails")
    }
}