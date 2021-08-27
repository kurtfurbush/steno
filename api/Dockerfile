FROM node:lts-alpine3.14 as backend

RUN mkdir /api

WORKDIR /api

COPY package.json /api
COPY yarn.lock /api

RUN yarn

COPY . /api

EXPOSE 5000

CMD ["yarn", "start"]