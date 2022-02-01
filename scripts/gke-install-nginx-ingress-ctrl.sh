#! /usr/bin/bash

HELM="$(which helm || echo microk8s helm3)" # Fallback for microk8s
$HELM repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$HELM repo update

helm install nginx-ingress ingress-nginx/ingress-nginx
