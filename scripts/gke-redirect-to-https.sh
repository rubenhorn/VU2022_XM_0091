#! /usr/bin/bash
NAMESPACE="development"

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit 1
fi

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s

DEPLOYMENT=$(cat <<EOF
{
  "apiVersion": "networking.gke.io/v1beta1",
  "kind": "FrontendConfig",
  "metadata": {
    "name": "redirect-to-https"
    "namespace": "$NAMESPACE"
  },
  "spec": {
    "redirectToHttps": {
      "enabled": true
    }
  }
}
EOF
)
echo -e $DEPLOYMENT | $KUBECTL apply -f -