FROM node:lts-alpine3.14 as frontend

RUN mkdir /ui

WORKDIR /ui

COPY package.json /ui
COPY yarn.lock /ui

RUN yarn

COPY . /ui

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]