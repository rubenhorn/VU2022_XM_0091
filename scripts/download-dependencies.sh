#! /usr/bin/bash

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

APP_NAME="vu-sc"
HELM="microk8s helm3"

$HELM dependency update ../helm/$APP_NAME
