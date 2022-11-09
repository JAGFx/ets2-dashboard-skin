FROM node:16-alpine

WORKDIR /usr/app

RUN apk update \
    && apk upgrade --available \
    && sync \
    && apk add git

RUN npm i -g npm@latest
USER node