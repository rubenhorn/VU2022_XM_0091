#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit 1
fi

if [ "$#" != 1 ] || { [ "$1" != frontend ] && [ "$1" != backend ] ;}; then
    echo "Expected exactly one argument (\`frontend' or \`backend')"
    exit 1
fi

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

docker build -t "vu_sc_$1" "../$1"
