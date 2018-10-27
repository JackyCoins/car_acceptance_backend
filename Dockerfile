FROM node:carbon

WORKDIR /app

COPY *.js* ./

RUN npm install -g nodemon

RUN npm install --only=production

COPY . /app

EXPOSE 8080

CMD ["nodemon", "src/server.js"]