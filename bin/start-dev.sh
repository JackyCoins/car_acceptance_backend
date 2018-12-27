#!/bin/bash

pathToEnvFile=$PWD/config/deploy.env
export IP_SERVER=$(grep IP_SERVER ${pathToEnvFile} | cut -d'=' -f2)
export PORT_REGISTRY_SERVER=$(grep PORT_REGISTRY_SERVER ${pathToEnvFile} | cut -d'=' -f2)

#Start services
docker-compose up --build -d mongo
sleep 5
docker-compose up --build web-dev