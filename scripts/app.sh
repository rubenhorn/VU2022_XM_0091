#! /usr/bin/bash
APP_NAME="vu-sc"

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

HELM="$(which helm || echo microk8s helm3)" # Fallback for microk8s
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH


if [ "$1" == down ]; then
    $HELM uninstall $APP_NAME
    exit
fi

if [ "$($HELM list | grep $APP_NAME)" != "" ]; then
    $HELM upgrade $APP_NAME ../helm/$APP_NAME
else
    $SCRIPTPATH/gen-secrets.sh -y
    $HELM install $APP_NAME ../helm/$APP_NAME
fi
