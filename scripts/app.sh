#! /usr/bin/bash
APP_NAME="vu-sc"
REGISTRY="${REGISTRY:=localhost:32000}"
INGRESS_CLASS="${INGRESS_CLASS:=public}"
APP_HOSTNAME="${APP_HOSTNAME:=127.0.0.1.nip.io}"

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

OVERRIDES="--set registry=$REGISTRY --set ingressClass=$INGRESS_CLASS --set hostname=$APP_HOSTNAME"

if [ "$($HELM list | grep $APP_NAME)" != "" ]; then
    $HELM upgrade $OVERRIDES $APP_NAME ../helm/$APP_NAME
else
    $SCRIPTPATH/gen-secrets.sh -y
    $HELM install $OVERRIDES $APP_NAME ../helm/$APP_NAME
    echo -e "app running at http://$APP_HOSTNAME (make sure to add the rootCA.crt to the authorities in your browser!)"
fi
