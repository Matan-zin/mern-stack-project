FROM node:14

RUN apt-get update -y  \
    && apt-get upgrade -y \
    && apt-get -y install curl python build-essential git ca-certificates

ENV PORT="5858" 
 
RUN mkdir -p /users_web-service /users_web-service/halpers/ /users_web-service/models/ /users_web-service/routes/ /users_web-service/users-fs/

COPY package.json *.mjs /users_web-service/
COPY halpers/ /users_web-service/halpers/
COPY models/ /users_web-service/models/
COPY routes/ /users_web-service/routes/
COPY users-fs/ /users_web-service/users-fs/

WORKDIR /users_web-service

RUN npm install

RUN node createAdmin.mjs 017ed254-d960-4e10-9abe-83751f00e042 zin

EXPOSE 5858 
CMD [ "node", "./app.mjs" ]