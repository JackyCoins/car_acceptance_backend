#!/bin/bash
pathToEnvFile=$PWD/config/deploy.env
pathToWorkDir=/home/projects/car_acceptance_backend
USER_SERVER=$(grep USER_SERVER $pathToEnvFile | cut -d'=' -f2)
IP_SERVER=$(grep IP_SERVER $pathToEnvFile | cut -d'=' -f2)

if [[ ! -z ${USER_SERVER} ]] && [[ ! -z ${IP_SERVER} ]]
then

#Login to Docker
#docker login

#Build a new image and push it
#docker build -t rusanovnd/car_acceptance_backend:latest .
#docker push rusanovnd/car_acceptance_backend:latest

#Copy docker-compose
ssh $USER_SERVER@$IP_SERVER "mkdir -p $pathToWorkDir"
scp docker-compose.yml $USER_SERVER@$IP_SERVER:$pathToWorkDir

#Connect to the server and go to the directory
ssh $USER_SERVER@$IP_SERVER "/bin/bash -s" < $PWD/bin/startServer.sh

else
echo "You need to have the ip and the user in your .env file"
fi