import { Body, Controller, Get, Inject, Param, Post, Query, Res } from '@nestjs/common';
import { IRegisterAppService } from 'src/v1/service/application';
import { User } from 'src/v1/service/model/info';


@Controller('register')
export class RegisterController {
  constructor(@Inject('IRegisterAppService') private readonly  registerAppService:  IRegisterAppService) {}

  private verificationRes(register, res){
    if(register && (register.isSend || register.isVerify)){ 
      const { isSend, isVerify, expiresAt, email } = register;
      const state = {isSend, isVerify, expiresAt, email };
      res.status(200).json({ 
        code: 200, 
        msg: "Success", 
        data: state
      })
    }else{
      res.status(200).json({ 
        code: 200, 
        msg: "Success", 
        data: {
          isSend: false,
          isVerify: false,
          expiresAt: '',
          email: ''
        },
      })
    }
  }

  @Post('email/verification/check')
  async emailVerifyCheck(
    @Body() req:{ 
      email:string, 
      code:string}, 
    @Res() res
  ){
    const register = await this.registerAppService.verificationCheck({email: req.email, code: req.code});
    return this.verificationRes(register, res)
  }

  @Post('email/verification/send')
  async emailVerifySend(@Body() req:{email:string}, @Res() res) {
    const register = await this.registerAppService.verificationSend({email: req.email});
    this.verificationRes(register, res)
  }

  @Post('user/check')
  async userCkech(@Body() req:{email:string}, @Res() res){
    const user = await this.registerAppService.userCheck({email: req.email})
    console.log(User.asDTO(user))
    res.status(200).json({ 
      code: 200, 
      msg: "Success", 
      data: User.asDTO(user),
    })
  }

}
