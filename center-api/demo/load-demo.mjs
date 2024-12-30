import { PrismaClient } from '@prisma/client';
import  {logger}  from './logger.mjs';
import { config } from 'dotenv';
import  {appConfig } from './demo.config.mjs';
import { equal } from 'assert';

// config
config({
  path: '../../.env'
});

// 创建Prisma客户端实例
const prisma = new PrismaClient();

async function loadPermission() {
  for(var i in appConfig.permisstions){

    const per = appConfig.permisstions[i]

    await prisma.permission.upsert({
      where: {  id: per.id },
      create: { id: per.id, name: per.name, },
      update:{ id: per.id, name: per.name }
    })
    logger.info('successfully upsert database e-com; table t_permission; ' + JSON.stringify(per));
  }
}

async function loadRole() {
  for(var i in appConfig.role){

    const r = appConfig.role[i]
    await prisma.role.upsert({
      where: {  id: r.id },
      create: { id: r.id, name: r.name, },
      update:{ id: r.id, name: r.name }
    })
    logger.info('successfully upsert database e-com; table t_role; ' + JSON.stringify(r));
  }
}

async function loadVerifyEmaile() {
  for(var i in appConfig.verifyEmail){
    const x = appConfig.verifyEmail[i]
    await prisma.register.upsert({
      where:{ id: x.id },
      create:{
        id: x.id,
        email: x.email,
        code:  x.code,
        expiresAt: new Date(x.expiresAt),
        isVerify: x.isVerify,
        isSend: x.isSend,
        from: x.from,
        to: x.to,
        subject: x.subject,
        templateName: x.templateName,
      },
      update: {
        id: x.id,
        email: x.email,
        code:  x.code,
        expiresAt: new Date(x.expiresAt),
        isVerify: x.isVerify,
        isSend: x.isSend,
        from: x.from,
        to: x.to,
        subject: x.subject,
        templateName: x.templateName,
      }
    })

    logger.info('successfully upsert database e-com; table t_verify; ' + JSON.stringify(x));
  }
}

async function loadUser(){
  for(var i in appConfig.user){
    const x = appConfig.user[i]

    const permissions = await prisma.permission.findMany({ where: { id: {gte: x.permissionLevel}}})
    await prisma.user.upsert({
      where: {id: x.id},
      create:{ id: x.id, email: x.email, password: x.password, userIdentity: x.userIndentify,isRegister: x.isRegister,
        role: { connect: { id: x.roleLevel } },  
        permissions:  { connect: permissions.map(({ id }) => ({ id })) }
      },
      update:{id: x.id, email: x.email, password: x.password, userIdentity: x.userIndentify,isRegister: x.isRegister,
        role: { connect: {id: x.roleLevel} },  
        permissions: { connect: permissions.map(({ id }) => ({ id })) }
      },
    })
    logger.info('successfully upsert database e-com; table t_user; ' + JSON.stringify(x));
  }
}

async function loadDemo() {
  try {
    // 连接数据库
    await prisma.$connect();


    await loadPermission();
    await loadRole();
    await loadVerifyEmaile();
    await loadUser();
    // 断开与数据库的连接
    await prisma.$disconnect();
  } catch (error) {
    logger.error(`Error initializing database: ${error.stack}`);
    // 断开与数据库的连接，即使出现错误也要确保连接被关闭
    await prisma.$disconnect();
  }
}




loadDemo();