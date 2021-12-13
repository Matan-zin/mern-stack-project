FROM node:lts-alpine3.14 as build

RUN apk update

WORKDIR /react-client

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --prodection

COPY . .

RUN INLINE_RUNTIME_CHUNK=false npm run build



FROM nginx:stable-alpine as prod

COPY --from=build /react-client/build/ /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]