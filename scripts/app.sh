#! /usr/bin/bash

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

APP_NAME=app
HELM="microk8s helm3"

if [ "$1" == down ]; then
    $HELM uninstall $APP_NAME
    exit
fi

if [ "$($HELM list | grep $APP_NAME)" != "" ]; then
    $HELM upgrade $APP_NAME ../kubernetes/vu_sc
else
    $HELM install $APP_NAME ../kubernetes/vu_sc
fi
