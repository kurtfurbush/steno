#!/bin/bash
echo "Building images"
(cd ./api && docker build . -t steno-api:latest)
(cd ./ui && docker build . -t steno-ui:latest)

echo "Launching"
(docker-compose up -d)

echo "Docker brought up successfully"