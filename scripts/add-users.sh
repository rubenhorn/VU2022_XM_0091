#! /usr/bin/bash
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

cat ../known_tokens.csv >> /var/snap/microk8s/current/credentials/known_tokens.csv

# Restart microk8s
microk8s stop
microk8s start