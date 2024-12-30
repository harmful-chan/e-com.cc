import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "src/v1/service/domain";
import { User } from "src/v1/service/model/info";
import { IUserRepository } from "src/v1/service/repository";

@Injectable()
export class UserService implements IUserService{


  constructor(
    @Inject("IUserRepository") private readonly userRepository:IUserRepository
  ){}

  async userCheck({ email }: { email: any; }): Promise<any> {
    const user:User = await this.userRepository.query({p:'email', v:email});
    return user;
  }

}