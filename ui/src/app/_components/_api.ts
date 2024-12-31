
export class Api {
  static check = async ( email:string, code:string = '' ) => await fetch("http://localhost:3001/api/v1/register/email/verification/check",{
      method: 'POST', 
      headers: [ ['Content-Type', 'application/x-www-form-urlencoded']], 
      body: `email=${email}` + (code !=='' ?`&code=${code}`: '')
    })
    .then((response)=>{return response.json()})
    .catch((e)=>{return null});
  
  static send = async ( email:string ) => await fetch("http://localhost:3001/api/v1/register/email/verification/send",{
      method: 'POST', headers: [ ['Content-Type', 'application/x-www-form-urlencoded']], body: `email=${email}`
    })
    .then((response)=>{return response.json()})
    .catch((e)=>{return null});


    static userCheck = async ( email:string ) => await fetch("http://localhost:3001/api/v1//register/user/check",{
      method: 'POST', headers: [ ['Content-Type', 'application/x-www-form-urlencoded']], body: `email=${email}`
    })
    .then((response)=>{return response.json()})
    .catch((e)=>{return null});
}