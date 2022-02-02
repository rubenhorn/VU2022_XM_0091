#! /usr/bin/bash
CLUSTER="vu-sc-cluster-1"
ZONE="europe-west4-a"

if [[ $PROJECT == "" ]]; then
        echo "Please first run: export PROJECT=<GCP project ID>"
        exit 1
fi

gcloud container clusters list --project $PROJECT | grep $CLUSTER
if [[ $? -eq 0 ]]; then
        gcloud container clusters get-credentials $CLUSTER --zone $ZONE --project $PROJECT
        exit
fi

echo "Cluster \`$CLUSTER' was not found! Do you want to create it?"
if [ "$answer" == "${answer#[Yy]}" ] ;then
    exit
fi

gcloud container clusters create $CLUSTER \
    --num-nodes 2 \
    --machine-type n1-standard-1 \
    --enable-network-policy \
    --zone $REGION

echo "It can take a few minutes to set up the cluster."
echo "Please check https://console.cloud.google.com/kubernetes/clusters/details/$REGION/$CLUSTER/details?project=$PROJECT"
echo "(Re-run this script after it has been created)"
