
export class EmailAdderss{
  private emailAddress: string = '';
  
  constructor(email: string){
    
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(emailRegex.test(email)){
      this.emailAddress = email;
    }else{
      throw new Error(`邮箱地址格式不正确: ${email}`);
    }
  }

  toString(){
    return this.emailAddress;
  }
}