
export interface IRegisterAppService {             
  verificationCheck({email, code}): Promise<any>;
  verificationSend({email}): Promise<any>;
  userCheck({email}):Promise<any>;
}


