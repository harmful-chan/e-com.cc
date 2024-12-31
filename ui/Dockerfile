# 基础镜像选择 Node.js
FROM node:20.17.0-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目的其他文件到容器中
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 设置容器启动命令
CMD ["npm", "start"]