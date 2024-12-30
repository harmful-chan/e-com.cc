# 《E-COM：电商运营一站式服务平台》

## 业务分析

### 业务概述

本网站为电商运营者提供综合服务，包括账号服务（提供注册所需住宅 IP、邮箱及一次性手机号）、专线与物流服务（搭建电商专线确保网络稳定，提供全球已上网跟踪物流单号）、运营管理服务（高效订单处理 ERP 系统管理订单全环节），满足电商新手及企业在各环节关键需求，助力电商业务发展。

### 业务架构

前后端基于nextjs框架，使用Github Action 自动打包容器镜像并上传至jump.swainle.com:5000私有镜像仓库。 使用定时任务执行代码检测main分支下 publish.txt 文件内的版本号。该版本号指定了应该执行的程序以及版本脚本。当本地仓库没有publish.txt 对应分支时切换到对应代码。 项目路径如下图所示：

```plaintext
.env
publish.txt    // 写明当前存放的版本。例如：2.3.0
central-app    // 主网站
tools
↘-- com
|     ↘-- check_local.sh    // 检查本地机器
|          check_hub.sh    //检查仓库更新
|          set_private.sh    // 设置本shell环境变量
|          private.txt    // 隐私文件存储KEY,用base64加密
|          
↘-- vps
     ↘-- check_healthy.sh
          install.sh
     central-app
     ↘-- check_update.sh
	      build_local_act.sh
	      install.sh
     registry
	     install.sh
docs
↘-- gitflow.md    // 工作流文档
     conventional.md    // 提交规范
     openapi/api/v1
	 ↘-- 		 
README.md
```

* vps node这个模块主要用于VPN节点自动更新部署，实时上传节点服务器的数据。与 central 搭配使用.central 作为主要数据中心收集节点上传的服务器状态以及通过邮件等方式通知的节点更新或者失联。节点通过API的方式上传自身状态。

* central 收集节点状态，更新，失联，新增。节点的状态通知。

#### 工具集

* 前端 : nextjs + ant.design

* 后端 : nextjs + primsa

* 数据库 : prisma + mongodb(sqlite)

* 反向代理 : caddy

* 容器仓库 : registry + htpasswd

* API First : openapi + stoplight

* 构建 : Dockerfile

* CI/CD : github action + act

* 部署 : shell

### 业务流程

> [账密](https://docs.qq.com/sheet/DRndDREJsRXVjaGxo)

### 业务模块

#### 授权认证

用户使用 JWT 认证，http请求时header包含会话ID，会话ID对应一个会话JWT存放在数据库中，会话有效期1小时，JWT有效期天。

* Header: E-Authorization

```
E-Authorization: XXX
```

> * [JWT](https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

#### 接码模块

作为 sms-man 的分销商，享受每次客户消费的3%作为佣金，满10USD 可通过USDT-TRC20提取佣金。代理账号通过余额充值。

> * API文档：https://sms-man.com/api
>
> * 代理账号：e-com.cc@outlook.com
>
> * 提款账号：bushyneville9329@gmail.com

#### 网络专线

作为 proxy302.com、proxy-seller.com 的分销商，获取交易金额的5%‘、10%作为佣金，超过10USD 可提现至paypal，支付宝。

> * [proxy302.com API文档](https://proxy302.apifox.cn/)
>
> * [proxy-seller.com API文档](https://proxy-seller.com/zh/personal/api/)
>
> * 代理账号：e-com.cc@outlook.com
>
> * 提现账号：bushyneville9329@gmail.com

#### 单号服务

对接 danhao.work 获取有跟踪信息的物流单号。冲2000送2000服务。

> * [danhao.work API文档](https://console-docs.apipost.cn/preview/0a7ae2be7f098c0e/224c3591c312a4e4?target_id=7443b011-2c8b-4c4a-b264-bbd1c8cc3dc1)
>
> * 充值账号：bushyneville9329@gmail.com

#### 账号模块

对接 zhanghaoya.com、meiquappleid.com 购买账号，

> * 购买推荐链接：https://www.zhanghaoya.com/?from=4029
>
> * 推广账号：e-com.cc@outlook.com
>
> * 提现账号：bushyneville9329@gmail.com

#### 礼品卡模块

对接 shop.pockyt.io 礼品卡网站，购买礼品卡，返回网站输入充值码充值。

> * [礼品卡网站](https://shop.pockyt.io/pc/home)

## 支付方式

使用微信小程序接入礼品卡网站，购买礼品卡，返回网站输入充值码充值。 支付宝转账和微信转账作为和后备充值手段。&#x20;

支付宝：e-com.cc@outlook.com / 852-95626878 / 陈*锋&#x20;

Paypal香港：e-com.cc@outlook.com / +85295626878

| ![](README_md_files/f82f5700-968a-11ef-8fc5-09059c88e994.jpeg?v=1&type=image) | ![](README_md_files/0322af40-968b-11ef-8fc5-09059c88e994.jpeg?v=1&type=image) | ![](README_md_files/05ea33b0-968b-11ef-8fc5-09059c88e994.jpeg?v=1&type=image) |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |

#### YunGouOS

允许个人申请商户的服务商,申请微信商户号，做微信小程序和在线网站购买点卡。

> * [YunGouOS](https://www.yungouos.com/#/) &#x20;

| ![](README_md_files/974a1fe0-968c-11ef-8fc5-09059c88e994.jpeg?v=1&type=image) | ![](README_md_files/9a31d680-968c-11ef-8fc5-09059c88e994.jpeg?v=1&type=image) |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |

