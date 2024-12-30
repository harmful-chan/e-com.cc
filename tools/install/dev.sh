#!/bin/bash


set -e

APP=$(dirname $(readlink -f "$0"))
ENV_FILE=""

source $APP/../env/.env
ENV_FILE+=" --env-file $APP/../env/.env"

source $APP/../env/.env.dev
ENV_FILE+=" --env-file $APP/../env/.env.dev"

source $APP/com.sh

# dev
# encode_secret

# dev test prod
# decode_secret
source $SECRET_FILE
ENV_FILE+=" --env-file $SECRET_FILE"


# 检查 shema 和数据库结构有无出入
function check_schema(){
  ROOT_DIR=$APP/../..

  pushd $ROOT_DIR/center-app
  TEMP="$(npx prisma migrate diff \
  --from-url "mongodb://root:123456@localhost:27017/db_ecom?authSource=admin"  \
  --to-schema-datamodel "prisma/schema.prisma")" 

  if [[ "$TEMP" != "No difference detected." ]]; then
    TEMP="$DATE $TEMP"
    echo $TEMP
    echo $TEMP >> logs/$(date +'%F')-app.log

    read -p "数据库结构有变化是否更新数据库(Y/N):" yes
    if [[ "${yes^^}" == "Y" ||  "$yes^^" == "YES"  ]]; then
      npx prisma migrate dev --name "script migrate"
    fi
    
  fi

  popd 
}

function loadDemo() {
  ROOT_DIR=$APP/../..

  pushd $ROOT_DIR/center-app
  
  popd 
}


# curl -fs http://localhost/ || docker-compose -f $APP/../caddy/docker-compose.yml $ENV_FILE up -d
curl -fs http://localhost:27017/ || docker-compose -f $APP/../center-app/docker-compose.yaml $ENV_FILE up db redis rabbit -d

# 初始化  postgresql demo数据
curl -fs http://localhost:5432/ || docker-compose -f $APP/../center-api/docker-compose.yaml $ENV_FILE run --rm load-demo


# 
