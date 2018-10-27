FROM node:carbon

WORKDIR /app

ADD *.js* ./

RUN npm install -g nodemon

RUN npm install --only=production

COPY . /app

EXPOSE 8080

CMD ["nodemon", "src/server.js"]