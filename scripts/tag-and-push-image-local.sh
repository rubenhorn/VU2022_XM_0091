#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

if (( $# != 1 )); then
    echo "Expected exactly one argument (container tag)"
    exit 1
fi

docker tag $1 "localhost:32000/$1" && \
    docker push "localhost:32000/$1"
