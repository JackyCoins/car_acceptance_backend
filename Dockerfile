FROM node:lts

WORKDIR /app

COPY *.js* ./

RUN \
    npm install -g nodemon && \
    npm install

COPY . /app

RUN npm run build:prod