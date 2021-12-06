FROM nginx:stable

EXPOSE 80
EXPOSE 443

RUN apt-get update \
    && apt-get install -y cron bash wget certbot \
    && apt-get update -y \
    && mkdir -p /webroots /scripts \
    && rm -f /etc/nginx/conf.d/default.conf \
    && rm -f /etc/cron.d/certbot

COPY *.sh /scripts/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /scripts/*.sh

VOLUME /webroots
VOLUME /etc/letsencrypt
VOLUME /etc/nginx/conf.d

WORKDIR /scripts

RUN echo "22 03 * * 2,7 root /scripts/renew.sh" >/etc/cron.d/certbot-renew

CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]