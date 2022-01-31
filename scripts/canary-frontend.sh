#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit 1
fi

if [ "$#" != 1 ] || { [ "$1" != "build-and-push" ] && [ "$1" != "deploy" ] && [ "$1" != "undeploy" ] && [ "$1" != "release" ] ;}; then
    echo "Expected exactly one argument (\`build-and-push',  \`deploy',  \`undeploy',  \`release')"
    exit 1
fi

KUBECTL="microk8s kubectl"

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH

IMAGE="vu_sc_frontend"
PREFIX="vu-sc"
NAMESPACE="development"
NUM_CANARY_PODS=1

NUM_PODS=$($KUBECTL get pods -n $NAMESPACE | grep frontend | wc -l)

if [ "$1" == "build-and-push" ]; then
    docker build -t "$IMAGE:canary" "../frontend" && \
        docker tag "$IMAGE:canary" "localhost:32000/$IMAGE:canary" && \
            docker push "localhost:32000/$IMAGE:canary"
elif [ "$1" == "deploy" ]; then
    DEPLOYMENT=$(cat <<EOF
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "$PREFIX-frontend-canary",
    "namespace": "$NAMESPACE"
  },
  "spec": {
    "replicas": $NUM_CANARY_PODS,
    "selector": {
      "matchLabels": {
        "app": "$PREFIX-frontend"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "$PREFIX-frontend"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "$PREFIX-frontend",
            "image": "localhost:32000/$IMAGE:canary",
            "imagePullPolicy": "Always",
            "ports": [
              {
                "containerPort": 3001
              }
            ]
          }
        ]
      }
    }
  }
}
EOF
)
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-frontend --replicas=$(expr $NUM_PODS - $NUM_CANARY_PODS)
    echo -e $DEPLOYMENT | $KUBECTL apply -f -
elif [ "$1" == "undeploy" ]; then
    $KUBECTL delete -n $NAMESPACE deployment $PREFIX-frontend-canary
    $KUBECTL scale -n $NAMESPACE deployment $PREFIX-frontend --replicas=$NUM_PODS
elif [ "$1" == "release" ]; then
    docker tag "$IMAGE:canary" "localhost:32000/$IMAGE:latest" && \
        docker push "localhost:32000/$IMAGE:latest"
    $SCRIPTPATH/app.sh up
fi
