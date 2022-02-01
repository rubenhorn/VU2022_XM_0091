#! /usr/bin/bash
NAMESPACE="development"

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s


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