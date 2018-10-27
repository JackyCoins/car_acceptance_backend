## Launch docker image
### Production
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 -e "NODE_ENV=production" car_acceptance_backend
```
### Develop
- by container
```
docker-compose up --build
```
- by docker-compose

To entrance to a running container
```
docker exec -it name_of_container /bin/bash
```


