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

echo -n "Cluster \`$CLUSTER' was not found! Do you want to create it? "
read answer
if [ "$answer" == "${answer#[Yy]}" ] ;then
    exit
fi

gcloud container clusters create $CLUSTER \
    --num-nodes 2 \
    --machine-type n1-standard-1 \
    --enable-network-policy \
    --zone $ZONE

echo -e "Cluster was created! (see https://console.cloud.google.com/kubernetes/clusters/details/$ZONE/$CLUSTER/details?project=$PROJECT)"
# Restart script
$(basename $0) && exit
