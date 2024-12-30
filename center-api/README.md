# 目标
这个模块实现后端API功能

# 架构
使用nestjs作为开发框架，prisma框架作为数据ORM框架，数据库使用postgresql。
- demo: 数据库初始化数据以及脚本
- src: 代码源文件
- src\v1\application\interface.ts: DDD设计模式定义APP的应用接口。
- src\v1\domian\interface.ts 领域接口文件
- src\v1\domian\repository.ts 仓储类接口定义
- src\v1\domian\client.ts 第三方工具客户端接口定义
- src\v1\domian\model 领域所需模型定义
- src\v1\Infrastructure\converter 对象转换器实现
- src\v1\Infrastructure\domian\impl.ts 领域接口实现
- src\v1\Infrastructure\client\impl.ts 第三方工具客户端接口实现
- src\v1\Infrastructure\repository\impl.ts 仓储类接口实现
- src\v1\Infrastructure\application\impl.ts ApplicationService 实现
- prisma\schema.prisma: 数据库schema

# 实现方式
