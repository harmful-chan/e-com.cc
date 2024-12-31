import { Injectable, Logger } from "@nestjs/common";
import {  PrismaClient } from "@prisma/client";
import { Register, User } from "src/v1/service/model/info";
import { IRegisterRepository, IUserRepository } from "src/v1/service/repository";


const prisma = new PrismaClient()

@Injectable()
export class RegisterRepository implements IRegisterRepository{

  private readonly logger = new Logger(RegisterRepository.name);

  async query({ p, v }: { p: string; v: any; }): Promise<Register> {
    
    return await prisma.register.findFirst({
      where: {
        [p]: v
      },
      orderBy:{
        createdAt: 'desc'
      }
    }) 
  }


  async upset(register: Register): Promise<void> {
    if(register && !register.id){
      await prisma.register.create({
        data: {
          email: register.email,
          code: register.code,
          expiresAt: register.expiresAt,
          isVerify: register.isVerify,
          isSend: register.isSend,
          from: register.from,
          to: register.to,
          subject: register.subject,
          templateName: register.templateName,
        }
      })
      this.logger.log(`Create ${register}`)
    }else{
      await prisma.register.update({
        where:{
          id: register.id
        },
        data:{
          id: register.id,
          email: register.email,
          code: register.code,
          expiresAt: register.expiresAt,
          isVerify: register.isVerify,
          isSend: register.isSend,
          from: register.from,
          to: register.to,
          subject: register.subject,
          templateName: register.templateName,
        }
      })
      this.logger.log(`Update ${JSON.stringify({...register, id: Number(register.id)})}`)
    }
    return;
  }

}


@Injectable()
export class UserRepository implements IUserRepository{

  async query({ p, v }: { p: any; v: any; }): Promise<User> {
    return prisma.user.findFirst({
      where:{ [p]: v },
      include:{
        role: true,
        permissions: true
      },
      orderBy: { createdAt: 'desc' }
    })
  }
  
}