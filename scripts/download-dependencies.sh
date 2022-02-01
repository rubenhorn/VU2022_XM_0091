#! /usr/bin/bash
CHART_NAME="vu-sc"

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

HELM="$(which helm || echo microk8s helm3)" # Fallback for microk8s

$HELM dependency update ../helm/$CHART_NAME
