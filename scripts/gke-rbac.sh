#! /usr/bin/bash
APP_NAME="rbac-gke"

HELM="$(which helm || echo microk8s helm3)" # Fallback for microk8s
KUBECTL="$(which helm || echo microk8s helm3)" # Fallback for microk8s
SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

function test_rbac {
    $KUBECTL auth can-i list pod --as foobar && exit 1
    $KUBECTL auth can-i list pod --as ruben.horn08@gmail.com || exit 1
}

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s

if [ "$1" == up ]; then
    $HELM install $APP_NAME ../helm/$APP_NAME
    echo -n "Testing RBAC... "
    test_rbac
    if [[ $? -ne 0 ]]; then
        echo "Failed!"
        exit 1
    else
        echo "Success!"
        exit 0
    fi
else
    $HELM uninstall $APP_NAME
fi
