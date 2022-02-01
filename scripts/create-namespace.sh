#! /usr/bin/bash
NAMESPACE="development"

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit 1
fi

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