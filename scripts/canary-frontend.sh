#! /usr/bin/bash
IMAGE="vu_sc_frontend"
PREFIX="vu-sc"
NAMESPACE="development"
NUM_CANARY_PODS=1
REGISTRY="${REGISTRY:=localhost:32000}"

if [ "$#" != 1 ] || { [ "$1" != "build-and-push" ] && [ "$1" != "deploy" ] && [ "$1" != "undeploy" ] && [ "$1" != "release" ] ;}; then
    echo "Expected exactly one argument (\`build-and-push',  \`deploy',  \`undeploy',  \`release')"
    exit 1
fi

KUBECTL="$(which kubectl || echo microk8s kubectl)" # Fallback for microk8s

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
cd $SCRIPTPATH


NUM_PODS=$($KUBECTL get pods -n $NAMESPACE | grep frontend | wc -l)

if [ "$1" == "build-and-push" ]; then
    docker build -t "$REGISTRY/$IMAGE:canary" "../frontend" && \
        docker push "$REGISTRY/$IMAGE:canary"
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
        "app": "$PREFIX-frontend",
        "release": "canary"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "$PREFIX-frontend",
          "release": "canary"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "$PREFIX-frontend",
            "image": "$REGISTRY/$IMAGE:canary",
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
    docker tag "$REGISTRY/$IMAGE:canary" "$REGISTRY/$IMAGE:latest" && \
        docker push "$REGISTRY/$IMAGE:latest"
    # $SCRIPTPATH/app.sh up
    # Since tag did not change, no rollout will be triggered -> delete pods to trigger PullImage on recreation
    $KUBECTL delete pods -l app=$PREFIX-frontend
fi
