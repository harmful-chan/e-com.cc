
export interface IEmailClient {
  sendVerifyEmail({to}): Promise<any>;
}
