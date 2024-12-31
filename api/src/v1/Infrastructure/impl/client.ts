import { Injectable, Logger } from "@nestjs/common";
import { IEmailClient } from "../../service/client";
import * as randomstring from 'randomstring';

import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import SlackConfirmEmail from "src/components/email-template/slack-confirm";
import { from, Subject } from "rxjs";

class ResendClientInfo {
  client: Resend;
  from: string;
  dailyCount: number;
  lastResetDate: Date;
}

class ResendManager {
  private readonly MAX_DAILY_EMAILS = 100;
  private readonly clients: Map<string, ResendClientInfo> = new Map();
  private readonly logger = new Logger(ResendManager.name);
  private readonly prisma = new PrismaClient();

  constructor() {
    this.initializeClients();
  }

  // 初始化客户端, 从环境变量中获取 Resend 的 API 令牌
  private async initializeClients() {
    let index = 0;
    while (true) {
      const token = process.env[`RESEND_USER_TOKEN_${index.toString().padStart(2, '0')}`];
      if (!token) break;

      const count = await this.getDailyCount(token);
      this.clients.set(token, {
        client: new Resend(token),
        dailyCount: count,
        from: `verify@supper${index > 0 ?  index.toString().padStart(2, '0') : ''}.e-com.cc`,
        lastResetDate: new Date()
      });
      index++;
    }

    if (this.clients.size === 0) {
      throw new Error('No Resend API tokens configured');
    }
  }

  // 获取每日发送邮件的数量
  private async getDailyCount(token: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await this.prisma.emailSendLog.count({
      where: {
        token: token,
        createdAt: {
          gte: today
        }
      }
    });

    return count;
  }

  // 获取可用的 Resend 客户端
  async getAvailableClient(): Promise<{client:Resend, clientFrom:string}> {
    for (const [token, info] of this.clients) {
      // 检查是否需要重置计数器
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (info.lastResetDate < today) {
        info.dailyCount = await this.getDailyCount(token);
        info.lastResetDate = today;
      }

      if (info.dailyCount < this.MAX_DAILY_EMAILS) {
        info.dailyCount++;
        await this.logEmailSent(token);
        return { client:info.client, clientFrom: info.from} ;
      }
    }

    throw new Error('Daily email limit exceeded for all clients');
  }

  // 记录邮件发送日志
  private async logEmailSent(token: string) {
    await this.prisma.emailSendLog.create({
      data: {
        token: token,
        createdAt: new Date()
      }
    });
  }
} 


@Injectable()
export class ResendEmailClient implements IEmailClient {
  private readonly logger = new Logger(ResendEmailClient.name);
  private readonly resendManager: ResendManager
  constructor() {
    this.resendManager = new ResendManager()
  }


  private createVerifyEmail(code:string) {
    return SlackConfirmEmail({ validationCode: code });
  }

  async sendVerifyEmail({ to }): Promise<any> {
    try{
      const code = randomstring.generate( { 
        length: 6,
        charset: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      });
      const expiresAt = new Date().getTime() + 1000*60*30;
    
      // 获取可用的 Resend 客户端
      const {client, clientFrom} = await this.resendManager.getAvailableClient();

      // 发送邮件
      const { data, error } = await client.emails.send({
        from: clientFrom,
        to: to,
        subject: "Verify Email E-COM CC",
        react: this.createVerifyEmail(code)
      });

      if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      this.logger.log(`Email sent successfully to ${to}. ID: ${data?.id}`);

      return {
        from: 'supper@e-com.cc',
        to: to,
        subject: "Verify Email E-COM CC",
        templateName: 'slackc-confirm',
        expiresAt: new Date( expiresAt ),
        code: code
      }

    } catch (error) {
      this.logger.error(`Error sending email to ${to}: ${error.message}`);
      throw error;
    }
  }
}