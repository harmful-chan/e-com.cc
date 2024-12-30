import { Register, User } from "./model/info";



export interface IRegisterRepository{
  query({ p, v }): Promise<Register>
  upset(register: Register): Promise<void>;
}

export interface IUserRepository{
  query({ p, v }): Promise<User>
}