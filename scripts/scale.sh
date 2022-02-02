#! /usr/bin/bash
NUM_PODS_HIGH=4
NUM_PODS_LOW=2
NAMESPACE="development"
PREFIX="vu-sc"

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s

if [ "$1" == up ]; then
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-frontend --replicas=$NUM_PODS_HIGH
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-backend --replicas=$NUM_PODS_HIGH
else
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-frontend --replicas=$NUM_PODS_LOW
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-backend --replicas=$NUM_PODS_LOW
fi
