#! /usr/bin/bash

set -e

cd _docker/db
ENV=${ENV:-local} bash ./start.sh
