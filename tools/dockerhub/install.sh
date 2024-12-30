#!/bin/bash
set -e

source ../.env
# 设置用户名和密码
USERNAME=${DOCKER_USERNAME:="root"}
PASSWORD=${DOCKER_PASSWORD:="123456"}

# 安装 Podman Compose（如果尚未安装）
if! command -v podman-compose &> /dev/null
then
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if grep -qi "ubuntu" /etc/os-release; then
            sudo apt-get -y install podman-compose apache2-utils
        elif grep -qi "centos" /etc/os-release; then
            sudo yum install -y podman-compose httpd-tools
        else
            echo "Unsupported operating system."
            exit 1
        fi
    fi
fi

# 创建目录结构
mkdir -p auth

# 设置用户密码
htpasswd -Bbn $USERNAME $PASSWORD > auth/htpasswd

# 启动私有镜像仓库
docker-compose up -d

echo "Private registry started on port 5000. You can now push images after logging in with username '$USERNAME' and password '$PASSWORD'."