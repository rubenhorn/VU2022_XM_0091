Project for the course Software Containerization (CS Master) at VU

Prerequisites:
 - microk8s with dns, helm3, registry, storage, traefik

Setup:
 1. Build container images
 2. Push container images
 3. Generate tls certificate
 4. Apply modified traefik daemonset
 5. Install helm chart

Folders:
 - /backend contains the backend of the app
 - /database contains the compose file for local development using MongoDB
 - /frontend contains the frontend of the app
 - /helm contains the files for deploying the application on a cluster
 - /scripts contains useful scripts to cut down the amount of cli interaction
 - /traefik contains a modified daemonset for redirecting all http trafik to https

Scripts:
 - Use /scripts/build-and-push.sh to update the images for kubernetes
 - Use /scripts/download-dependencies.sh to get external helm charts
 - Use /scripts/gen-secrets.sh to create kubernetes secrets used by helm
 - Use /scripts/gen-tls.sh to create a rootCA and TLS certificate used by helm
 - Use /scripts/app.sh to manage the deployment of the app through helm
 - Use /scripts/test-net-policies.sh to challenge the network policy restrictions

Patching:
 - Change the theme by running patch -p0 < theme.patch
 - Undo the change by running the same command including the -R flag
