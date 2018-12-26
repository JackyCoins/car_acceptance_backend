## Launch docker image

### Production
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 -e "NODE_ENV=production" car_acceptance_backend
```
### Develop
Run to data base:
```
docker-compose up --build mongo
```
Run to develop the application:
```
docker-compose up --build web
```
Run to test:
```
docker-compose up --build test
```

Test the application with `autocannon`:
```
docker-compose up --build autocannon
```

### Deploy
The first time:
```
chmod +x ./bin/deploy.sh
```

```
./bin/deploy
```


