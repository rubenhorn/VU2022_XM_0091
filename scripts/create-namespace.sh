#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit 1
fi

KUBECTL="microk8s kubectl"

NAMESPACE="development"

DEPLOYMENT=$(cat <<EOF
{
  "apiVersion": "v1",
  "kind": "Namespace",
  "metadata": {
    "name": "$NAMESPACE",
    "labels": {
      "name": "$NAMESPACE"
    }
  }
}
EOF
)
echo -e $DEPLOYMENT | $KUBECTL apply -f -