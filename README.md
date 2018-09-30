##Launch docker image
###Production
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 car_acceptance_backend -e "NODE_ENV=production"
```

###Develop
```
docker build -t car_acceptance_backend .
docker run --rm -it -p 8080:8080 -v $(pwd):/app car_acceptance_backend bash
root@id:/app# nodemon src/server.js
```


