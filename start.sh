#! /usr/bin/bash

set -e

cd _docker/all
ENV=${ENV:-local} bash ./start.sh
