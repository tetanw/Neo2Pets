FROM node:9.3.0-alpine

RUN mkdir -p /webapp

WORKDIR /webapp

ADD . .

EXPOSE  3001

CMD node server