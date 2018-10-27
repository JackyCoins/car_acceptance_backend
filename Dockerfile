FROM node:carbon

WORKDIR /app

COPY *.js* ./

RUN npm install -g nodemon

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["nodemon", "src/server.js"]