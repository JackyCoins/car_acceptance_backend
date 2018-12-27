## Launch docker image

### Production
```
docker build -t rusanovnd/car_acceptance_backend:latest .
docker-compose up --build web-prod
```
### Develop
Run to data base:
```
docker-compose up --build mongo
```
Run to develop the application:
```
./bin/start-dev.sh
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
./bin/deploy.sh
```


