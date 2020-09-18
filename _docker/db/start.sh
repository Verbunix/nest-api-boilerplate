#! /usr/bin/bash

set -e

echo "=====
ENV: $ENV
====="

docker network create public || true
docker volume create --name=store_db || true

docker-compose kill
docker-compose rm -f
docker-compose pull
docker-compose up -d
