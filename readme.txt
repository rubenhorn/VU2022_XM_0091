Project for the course Software Containerization (CS Master) at VU

Prerequisites:
 - microk8s with dns, helm3, registry, storage, traefik

Setup:
 1. Create .env file for frontend and backend
 2. Build container images
 3. Push container images
 4. Install helm chart

Folders:
 - /backend contains the backend of the app
 - /database contains the compose file for local development using MongoDB
 - /frontend contains the frontend of the app
 - /helm contains the files for deploying the application on a cluster
 - /scripts contains useful scripts to cut down the amount of cli interaction

Scripts:
 - Use /scripts/build-and-push.sh to update the images for kubernetes
 - Use /scripts/app.sh to manage the deployment of the app through helm
