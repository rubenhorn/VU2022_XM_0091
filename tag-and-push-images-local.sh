#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

docker tag vu_sc_backend localhost:32000/vu_sc_backend
docker tag vu_sc_frontend localhost:32000/vu_sc_frontend

docker push localhost:32000/vu_sc_backend
docker push localhost:32000/vu_sc_frontend
