

export interface IUserService {
  userCheck({email}): Promise<any>;
}