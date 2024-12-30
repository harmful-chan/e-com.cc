#!/bin/bash
set -e
APP=$(dirname $(readlink -f "$0"))
docker-compose -f $APP/../center-app/docker-compose.yaml \
               -f $APP/../caddy/docker-compose.yml \
               down