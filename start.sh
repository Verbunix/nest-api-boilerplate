#! /usr/bin/bash

set -e

cd _docker
ENV=${ENV:-local} bash ./start.sh
