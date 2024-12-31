

export const appConfig = {
  // demo 数据
  response:[
    {name:'Success', id:200, msg:'finish.'},
    {name:'Created', id:201, msg:'The resource was created successfully.'},
    {name:'NoContent', id:204, msg:'The deletion is successful, but the resource does not exist.'},
    {name:'BadRequest', id:400, msg:'The request parameter is incorrect.'},
    {name:'Forbidden', id:403, msg:'Insufficient permissions.'},
    {name:'NotFound ', id:404, msg:'The resource does not exist.'},
    {name:'InternalServerError', id:500, msg:'Handling errors.'},
  ],
  role:[
    {name:'guest', id:300 },
    {name:'personal', id:200 },
    {name:'purchase', id:100 },
    {name:'admin', id:0 },
  ],
  permisstions:[
    
    { name: 'guest:*', id: 300 },
    { name: 'personal:*', id: 200 },

    { name: 'purchase:giftcard', id: 199 },
    { name: 'purchase:track', id: 198 },
    { name: 'purchase:mail', id: 197 },
    { name: 'purchase:host', id: 196 },
    { name: 'purchase:residential', id: 195 },
    { name: 'purchase:sms', id: 194 },
    { name: 'purchase:airport', id: 193 },
    { name: 'purchase:*', id: 100 },

    { name: 'admin:*', id: 0 },
  ],
  verifyEmail:[
    {
      // 未过期 未校验 已发送 
      id: 1,
      email: 'UTrtLa2hGBol@Z.yrnu',
      code: "GR48CZ",
      expiresAt: '2025-12-25 16:21:00',
      from: 'test@e-com.cc',
      to: 'UTrtLa2hGBol@Z.yrnu',
      isVerify: false,
      isSend: true,
      subject: 'test email',
      templateName: 'slack-confirm'
    },
    {
      // 未过期 已校验 已发送 
      id: 2,
      email: 'LNy@TQCpSSSHBRyqLzDvnbO.tjs',
      code: "GTHXAZ",
      expiresAt: '2025-12-25 16:21:00',
      from: 'test@e-com.cc',
      to: 'LNy@TQCpSSSHBRyqLzDvnbO.tjs',
      isVerify: true,
      isSend: true,
      subject: 'test email',
      templateName: 'slack-confirm'
    },
    {
      // 已过期 未校验 已发送 
      id: 3,
      email: 'Zol36UyH6Xy@LsbZo.rq',
      code: "DJJYCZ",
      expiresAt: '2023-12-25 16:21:00',
      from: 'test@e-com.cc',
      to: 'Zol36UyH6Xy@LsbZo.rq',
      isVerify: false,
      isSend: true,
      subject: 'test email',
      templateName: 'slack-confirm'
    },
  ],
    
  user:[
    {
      id:0, email: 'admin@e-com.cc', password: '123456', userIndentify: "SW2024032901", isRegister: true,
      roleLevel: 0, permissionLevel: 0,   
    }
  ]
  ,
  // end demo数据
  // permisstions:[


  //   'auth.update',
  //   'auth.logout',
  //   'auth.permisstion',

  //   'purchase.giftcard',
  //   'purchase.giftcard.order',
  //   'purchase.paltform',
  //   'purchase.paltform.order',
  //   'purchase.residential',
  //   'purchase.residential.order',
  //   'purchase.tracking',
  //   'purchase.tracking.order',
  //   'purchase.host',
  //   'purchase.host.order',
  //   'purchase.sms',
  //   'purchase.sms.order',

  //   'personal',
  //   'personal.order',
  //   'personal.balance',
  //   'personal.transactions',


  //   'admin',
  //   'admin.vps',
  //   'admin.giftcard',
  //   'admin.jobs',
  //   'admin.products',
  //   'admin.order',
  //   'admin.balance',
  //   'admin.transactions',

  // ],
  walletTypes:[
    {
      identify: 'PA',
      supplier: 'zhanghaoya.com',
      describe: 'Paltform Purchase Wallet',
    },
    {
      identify: 'PS',
      supplier: 'sms-man.com',
      describe: 'SMS Purchase Wallet',
    },
    {
      identify: 'PT',
      supplier: 'danhao.work',
      describe: 'Tracking Purchase Wallet',
    },
    {
      identify: 'PH',
      supplier: 'proxy-seller.com',
      describe: 'Host IP Purchase Wallet',
    },
    {
      identify: 'PR',
      supplier: 'proxy302.com',
      describe: 'Residential IP Purchase Wallet',
    },
    {
      identify: 'PG',
      supplier: 'shop.pockyt.io',
      describe: 'Gift Card Purchase Wallet',
    },
  ],
  transactionsTypes:[
    'topup',  // 充值
    'deduct',  // 划扣
    'refund',  // 退款
    'transfer',  // 转账
  ],
  transactionsLockTypes:[
    'freeze',  // 冻结
    'unfreeze',  // 解冻
    'unfreezeWithDeduct', // 解冻并扣除
  ],
  orderStatusTypes:[
    'pending',  // 待处理
    'processing',  // 处理中
    'completed',  // 已完成
    'canceled',  // 已取消
    'failed',  // 失败
    'expired',  // 过期
  ],
  inventoryLockTypes:[
    'freeze',  // 冻结
    'unfreeze',  // 解冻
    'unfreezeWithDeduct', // 解冻并扣除
  ],
}