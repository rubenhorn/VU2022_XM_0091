#! /usr/bin/bash
REGISTRY="localhost:32000"

if [ "$#" != 1 ] || { [ "$1" != frontend ] && [ "$1" != backend ] ;}; then
    echo "Expected exactly one argument (\`frontend' or \`backend')"
    exit 1
fi

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

docker build -t "$REGISTRY/$1" "../$1" && \
    docker push "$REGISTRY/$1"
