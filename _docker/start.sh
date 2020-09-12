#! /usr/bin/bash

set -e

echo "=====
ENV: $ENV
====="

docker network create public || true

docker-compose kill
docker-compose rm -f
docker-compose pull
if [[ $BUILD = 1 ]]; then
    docker-compose up --build
else
    docker-compose up
fi
