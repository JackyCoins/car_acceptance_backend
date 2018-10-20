FROM node:carbon

WORKDIR /app

RUN npm install -g nodemon

ADD package*.json ./

RUN npm install

COPY src /app

EXPOSE 8080

CMD ["nodemon", "server.js"]