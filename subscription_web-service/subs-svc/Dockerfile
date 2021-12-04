FROM node:lts-alpine3.14

RUN apk update \
    && apk upgrade


ENV PORT="3030" 
ENV DB_URL="subs-db"
ENV DB_PORT="27017"
 
RUN mkdir -p /subscription_web-service \
/subscription_web-service/halpers/ /subscription_web-service/models/ \
/subscription_web-service/routes/ /subscription_web-service/schemas/

COPY package.json *.mjs /subscription_web-service/
COPY halpers/ /subscription_web-service/halpers/
COPY models/ /subscription_web-service/models/
COPY routes/ /subscription_web-service/routes/
COPY schemas/ /subscription_web-service/schemas/

WORKDIR /subscription_web-service

RUN npm install 

EXPOSE 3030 

CMD [ "node", "./app.mjs" ]