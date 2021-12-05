FROM nginx:stable-alpine

RUN apk update \
    && apk upgrade \
    && apk add cron bash wget cerbot

COPY *.sh /scripts/

RUN chmod +x /scripts/*.sh

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

VOLUME /webroots
VOLUME /etc/letsencrypt
VOLUME /etc/nginx/conf.d

WORKDIR /scripts

EXPOSE 80
EXPOSE 443

RUN echo "22 03 * * 2,7 root /scripts/renew.sh" >/etc/cron.d/certbot-renew

CMD ["sh", "-c", "cron && nginx -g daemon off;"]
