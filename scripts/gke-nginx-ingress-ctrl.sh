#! /usr/bin/bash

if [ "$#" != 1 ] || { [ "$1" != up ] && [ "$1" != down ] ;}; then
    echo "Expected exactly one argument (\`up' or \`down')"
    exit 1
fi

APP_NAME="nginx-ingress"

if [ "$1" == down ]; then
    helm uninstall $APP_NAME
    exit
fi

if [ "$(helm list | grep $APP_NAME)" != "" ]; then
    echo Already installed!
    exit
fi

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install  $APP_NAME ingress-nginx/ingress-nginx 1>/dev/null
echo "Successfully installed nginx ingress controller."
IP="<pending>"
while [ "$IP" == "<pending>" ]; do
    sleep 1
    IP=$(kubectl get services | grep -e "ingress-nginx-controller.*LoadBalancer" | awk '{ print $4 }')
done
echo -e "\nPlease run: export APP_HOSTNAME=$IP.nip.io\n"
