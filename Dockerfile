FROM node:carbon

WORKDIR /app

COPY *.js* ./

RUN \
    npm install -g nodemon && \
    npm install

COPY . /app