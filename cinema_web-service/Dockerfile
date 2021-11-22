FROM node:14

RUN apt-get update -y  \
    && apt-get upgrade -y \
    && apt-get -y install curl python build-essential git ca-certificates

ENV PORT="3100"
ENV ADMIN_FPSWD="1234"
ENV USERS_SVC_URL="http://users-svc:5858"
ENV AUTH_SVC_URL="http://auth-svc:5050"
ENV SUBS_SVC_URL="http://subs-svc:3030"
 
RUN mkdir -p /cinema_web-service /cinema_web-service/config/ /cinema_web-service/models/ /cinema_web-service/routes/

COPY package.json *.mjs /cinema_web-service/
COPY config/ /cinema_web-service/config/
COPY models/ /cinema_web-service/models/
COPY routes/ /cinema_web-service/routes/

WORKDIR /cinema_web-service

RUN npm install
RUN node generateKeys.mjs 

EXPOSE 3100

CMD [ "node", "./app.mjs" ]