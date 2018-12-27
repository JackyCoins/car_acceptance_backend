#!/bin/bash
pathToEnvFile=$PWD/config/deploy.env
pathToWorkDir=/home/projects/car_acceptance_backend
USER_SERVER=$(grep USER_SERVER ${pathToEnvFile} | cut -d'=' -f2)
IP_SERVER=$(grep IP_SERVER ${pathToEnvFile} | cut -d'=' -f2)
PORT_REGISTRY_SERVER=$(grep PORT_REGISTRY_SERVER ${pathToEnvFile} | cut -d'=' -f2)

if [[ ! -z ${USER_SERVER} ]] && [[ ! -z ${IP_SERVER} ]]
then

#Login to Docker
docker login

#Build a new image and push it
docker build -t ${IP_SERVER}:${PORT_REGISTRY_SERVER}/car_acceptance_backend:latest .
docker push ${IP_SERVER}:${PORT_REGISTRY_SERVER}/car_acceptance_backend:latest

#Copy docker-compose
ssh ${USER_SERVER}@${IP_SERVER} "mkdir -p $pathToWorkDir"
scp docker-compose.yml ${USER_SERVER}@${IP_SERVER}:${pathToWorkDir}

#Connect to the server and go to the directory
ssh ${USER_SERVER}@${IP_SERVER} "IP_SERVER=${IP_SERVER} PORT_REGISTRY_SERVER=${PORT_REGISTRY_SERVER} /bin/bash -s" < $PWD/bin/start-server.sh

else
echo "You need to have the ip and the user in your .env file"
fi