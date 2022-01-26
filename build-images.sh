#! /usr/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

docker build -t vu_sc_backend ./backend
docker build -t vu_sc_frontend ./frontend
# Download latest MongoDB image
# docker pull mongo
