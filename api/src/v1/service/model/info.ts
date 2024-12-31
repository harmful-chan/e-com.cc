import { register } from "module"

export class Register  {
  id: bigint
  email: string
  code: string
  expiresAt: Date
  isVerify: boolean
  isSend: boolean
  from: string
  to: string
  subject: string
  templateName: string

  createdAt: Date
  updateAt: Date

}

export class Role{
  id: bigint
  name: string
  createdAt: Date
  updateAt: Date
}

export class Permission {
  id: bigint
  name: string
  createdAt: Date
  updateAt: Date
}
export class User {
  id: bigint
  email: string
  password: string
  userIdentity: string
  isRegister: boolean
  roleId: bigint
  role: Role
  permissions: Permission[]

  createdAt: Date
  updateAt: Date
  
  static asDTO(user: User){
    return {
      email: user.email,
      userIdentity: user.userIdentity,
      isRegister: user.isRegister,
      role: user.role.name,
      permissions: user.permissions.map(x=> x.name)
    }
  }


}