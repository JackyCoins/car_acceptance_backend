##Launch docker image
###Production
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 -e "NODE_ENV=production" car_acceptance_backend
```

###Develop
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 -v $(pwd):/app car_acceptance_backend bash
nodemon src/server.js
```
or
```
docker swarm init
docker-compose up
# docker stack deploy -c docker-compose.yml car_acceptance_backend
```

To entrance to a running container
```
docker exec -it name_of_container /bin/bash
```


