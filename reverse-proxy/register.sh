mkdir -p /webroots/$1/.well-known/acme-challenge

certbot certonly --webroot -w /webroot/$1 -d $1
