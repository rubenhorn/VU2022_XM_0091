#! /usr/bin/bash
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

APP_NAME="vu-sc"
FOLDER_NAME="rbac"
HELM="microk8s helm3"

if [ "$1" == down ]; then
    $HELM uninstall $APP_NAME
    exit
fi

FILE_NAME="known_tokens.csv"
TOKEN_FILE="/var/snap/microk8s/current/credentials/known_tokens.csv"

if grep -Fxq "$FILE_NAME" $TOKEN_FILE
then
    break
else
    cat ../$FILE_NAME >> $TOKEN_FILE
fi

# Restart microk8s
microk8s stop
microk8s start

if [ "$($HELM list | grep $APP_NAME)" != "" ]; then
    $HELM upgrade $APP_NAME ../helm/$FOLDER_NAME
else
    $HELM install $APP_NAME ../helm/$FOLDER_NAME
fi