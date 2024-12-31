import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { ResendEmailClient } from 'src/v1/Infrastructure/impl/client';
import { RegisterRepository, UserRepository } from 'src/v1/Infrastructure/impl/repository';
import { RegisterAppService } from 'src/v1/Infrastructure/impl/application';
import { UserService } from 'src/v1/Infrastructure/impl/domian';



@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository, },
    { provide: 'IUserService', useClass: UserService, },
    { provide: 'IRegisterRepository', useClass: RegisterRepository, },
    { provide: 'IEmailClient', useClass: ResendEmailClient, },
    { provide: 'IRegisterAppService', useClass: RegisterAppService, },
  ],
})
export class RegisterModule {}
