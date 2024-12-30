
import { Register } from "../../service/model/info";
import { IRegisterRepository } from "../../service/repository";
import { IRegisterAppService } from "../../service/application";
import { Inject, Injectable } from '@nestjs/common';
import { IEmailClient } from "src/v1/service/client";
import { EmailAdderss } from "src/v1/service/model/entity";
import { register } from "module";
import { count } from "console";
import { IUserService } from "src/v1/service/domain";
import { User } from "@prisma/client";



@Injectable()
export class RegisterAppService implements IRegisterAppService {
  
  constructor( 
    @Inject('IEmailClient') private readonly emailClient: IEmailClient,
    @Inject('IRegisterRepository') private readonly registerRepository: IRegisterRepository,
    @Inject('IUserService') private readonly userService: IUserService,
  ){}



  async verificationCheck({email, code}): Promise<any> {
    const emailAddress = new EmailAdderss(email);
    const register = await this.registerRepository.query({ p: 'email', v: emailAddress.toString() })
    if(code && code !== ''){
      if(register.code.toLocaleLowerCase() === code.toLocaleLowerCase()){
        register.isVerify = true
        await this.registerRepository.upset(register)
      }
    }
    return register;
  }

  async verificationSend({ email }): Promise<any> {
    const emailAddress = new EmailAdderss(email);

    const { from, to, subject, templateName, code, expiresAt } =  await this.emailClient.sendVerifyEmail({to:emailAddress.toString() })
    const register  = new Register();
    register.email = emailAddress.toString()
    register.from = from
    register.to = to
    register.subject = subject, 
    register.templateName = templateName
    register.isSend = true
    register.code = code
    register.expiresAt = expiresAt
    register.isVerify = false
    await this.registerRepository.upset(register)
  }
  
  async userCheck({ email }): Promise<any> {
    const user:User = await this.userService.userCheck({email});
 
    return user
  }

}