#!/bin/bash
TAG=$1
HTTP=$2
HTTPS=$3

if [ -z "$1" ]; then
    TAG="local"
fi
if [ -z "$2" ]; then
    HTTP="80"
fi

docker network create shingo-dev-net

docker kill shingo-events
docker rm shingo-events

docker build -t shingo-events:${TAG} .

docker run -itd                                             \
    --volume $(pwd):/shingo-webapp                          \
    --name shingo-events                                    \
    --network shingo-dev-net                                \
    --publish ${HTTP}:80                                    \
    shingo-events:${TAG}