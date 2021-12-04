FROM node:lts-alpine3.14

RUN apk update \
    && apk upgrade

ENV PORT="5050"
ENV SERVICE_URL='0.0.0.0'
ENV SEQUELIZE_CONNECT="sequelize-mysql-docker.yml"

ENV ADMIN_ID="017ed254-d960-4e10-9abe-83751f00e042"
ENV ADMIN_NAME="zin"
ENV ADMIN_PSW="12345"
 
RUN mkdir -p /auth_web-service /auth_web-service/model/ /auth_web-service/route/

COPY package.json *docker.yml *.mjs /auth_web-service/
COPY model/ /auth_web-service/model/
COPY route/ /auth_web-service/route/

WORKDIR /auth_web-service

RUN npm install

EXPOSE 5050

CMD [ "node", "./app.mjs" ]