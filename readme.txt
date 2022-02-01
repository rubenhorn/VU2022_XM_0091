Project for the course Software Containerization (CS Master) at VU

Prerequisites:
 - microk8s with dns, helm3, registry, storage, traefik

Setup:
 1. Build container images
 2. Push container images
 3. Generate tls certificate
 4. Apply modified traefik daemonset
 5. Create namespace
 6. Add users to the static token file.
 7. Update helm chart dependencies
 8. Install helm chart

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
 - Use /scripts/create-namespace.sh to create the namespace `development'
 - Use /scripts/test-net-policies.sh to challenge the network policy restrictions
 - Use /scripts/clean-ctr.sh to evict all images from the cache of the local container registries
 - Use /scripts/canary-frontend.sh to manage the release of a new frontend
 - Use /scripts/add-users.sh to add three users to the static token file used for RBAC

Patching:
 - Change the theme by running patch -p0 < theme.patch
 - Undo the change by running the same command including the -R flag
