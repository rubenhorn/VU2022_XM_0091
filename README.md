Project for the course Software Containerization (CS Master) at VU

## Prerequisites:
 - microk8s with dns, helm3, registry, storage, ingress

## Setup:
 1. (On GKE, install the nginx ingress controller)
 2. (On GKE, run `export INGRESS_CLASS=nginx REGISTRY=gcr.io/<gcp-projectId> HOSTNAME="<IP>.nip.io"`)
 3. Build container images
 4. Push container images
 5. Generate tls certificate
 6. Create namespace
 7. Update helm chart dependencies
 8. Install helm chart
 
 (!) The app is deployed locally on _http://<!-- prevent auto generated link -->127-0-0-1.nip.io_ or on _http://\<IP\>.nip.io_ on GKE 

## Folders:
 - /backend contains the backend of the app
 - /database contains the compose file for local development using MongoDB
 - /frontend contains the frontend of the app
 - /helm contains the files for deploying the application on a cluster
 - /scripts contains useful scripts to cut down the amount of cli interaction

## Scripts:
 - Use /scripts/build-and-push.sh to update the images for kubernetes
 - Use /scripts/download-dependencies.sh to get external helm charts
 - Use /scripts/gen-secrets.sh to create kubernetes secrets used by helm
 - Use /scripts/gen-tls.sh to create a rootCA and TLS certificate used by helm
 - Use /scripts/app.sh to manage the deployment of the app through helm
 - Use /scripts/create-namespace.sh to create the namespace `development'
 - Use /scripts/test-net-policies.sh to challenge the network policy restrictions
 - Use /scripts/clean-ctr.sh to evict all images from the cache of the local container registries
 - Use /scripts/canary-frontend.sh to manage the release of a new frontend
 - Use /srcipts/install-nginx-ingress-ctrl to install nginx ingress controller

## Patching:
 - Change the theme by running `patch -p0 < theme.patch`
 - Undo the change by running the same command including the -R flag
