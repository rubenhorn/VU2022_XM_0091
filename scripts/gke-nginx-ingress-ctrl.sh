#! /usr/bin/bash

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

APP_NAME="nginx-ingress"

if [ "$1" == down ]; then
    helm uninstall $APP_NAME && \
        gcloud compute addresses delete $IP_NAME --region $REGION --quiet
    exit
fi

if [ "$(helm list | grep $APP_NAME)" != "" ]; then
    echo Already installed!
    exit
fi

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

REGION="us-central1"
IP_NAME="k8s-nginx-ingress-ctrl"

gcloud compute addresses create $IP_NAME --region $REGION && \
    IP=$(gcloud compute addresses describe $IP_NAME --region $REGION | grep address: | awk '{ print $2 }') && \
    helm install  $APP_NAME ingress-nginx/ingress-nginx --set controller.service.loadBalancerIP=$IP
