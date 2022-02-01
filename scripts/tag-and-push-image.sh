#! /usr/bin/bash
REGISTRY="localhost:32000"

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

if (( $# != 1 )); then
    echo "Expected exactly one argument (container tag)"
    exit 1
fi

docker tag $1 "$REGISTRY/$1" && \
    docker push "$REGISTRY/$1"
