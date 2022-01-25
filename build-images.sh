#! /usr/bin/sh

docker build -t vu_sc_backend ./backend
docker build -t vu_sc_frontend ./frontend
# Download latest MongoDB image
# docker pull mongo
