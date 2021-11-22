FROM mysql/mysql-server:8.0

EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD="mzmzmz"
ENV MYSQL_USER=auth-webservice
ENV MYSQL_PASSWORD=auth-webservice
ENV MYSQL_DATABASE=auth-webservice


CMD [ "mysqld", \
        "--character-set-server=utf8mb4", \
        "--collation-server=utf8mb4_unicode_ci", \
        "--bind-address=0.0.0.0" ]