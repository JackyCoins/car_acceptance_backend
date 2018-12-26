#!/bin/bash

cd /home/projects/car_acceptance_backend

#Pull the new image
docker pull rusanovnd/car_acceptance_backend:latest

#Remove old containers
docker ps -a | awk '{print $1,$2}' | grep mongo | awk '{print $1}' | xargs -I {} docker stop {}
docker ps -a | awk '{print $1,$2}' | grep rusanovnd/car_acceptance_backend | awk '{print $1}' | xargs -I {} docker stop {}

#Start new containers
docker-compose up -d mongo
sleep 5
docker-compose up web