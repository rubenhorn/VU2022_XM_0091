Project for the course Software Containerization (CS Master) at VU

## Prerequisites:
 - microk8s with dns, helm3, registry, storage, traefik

## Setup:
 1. (On GKE, run `export HOSTNAME="*.nip.io" INGRESS_CLASS=nginx REGISTRY=gcr.io/<gcp-projectId>`)
 2. Build container images
 3. Push container images
 4. Generate tls certificate
 5. (On microk8s, apply modified traefik daemonset)
 6. Create namespace
 7. Update helm chart dependencies
 8. (On GKE, install the nginx ingress controller)
 9. Install helm chart
 
 (!) The app is deployed locally on http://localhost:8080 or on <IP>.nip.io on GKE 

## Folders:
 - /backend contains the backend of the app
 - /database contains the compose file for local development using MongoDB
 - /frontend contains the frontend of the app
 - /helm contains the files for deploying the application on a cluster
 - /scripts contains useful scripts to cut down the amount of cli interaction
 - /traefik contains a modified daemonset for redirecting all http trafik to https

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

 (!) You might need to update some variables depending on your environement.
     These all follow the hashbang (2nd line of the script) until the first empty line.

## Patching:
 - Change the theme by running `patch -p0 < theme.patch`
 - Undo the change by running the same command including the -R flag
