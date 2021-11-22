# Subscriptions Service
---

## Build

To build this service seperatly from docker-compose,

### Prerequisites:

- docker
- docker.socket active run `sudo systemctl status docker.socket` to verify

run on current directory:

`sudo docker build -t subs-db-im ./subs-db/`
`sudo docker run -d --name subs-db -p 27017:27017 subs-db-im`
`sudo docker build -t subs-svc-im ./subs-svc/`
`sudo docker run -d --name subs-svc -p 3030:3030 subs-svc-im`

## API

### HTTP methods:

`GET  /movies`
`GET  /movies/:id`
`PUT  /movies`
`DEL  /movies/:id`
`POST /movies`

`GET  /members`
`GET  /members/:id`
`PUT  /members`
`DEL  /members/:id`
`POST /members`

`GET  /subscriptions`
`GET  /subscriptions/:id`
`PUT  /subscriptions`
`DEL  /subscriptions/:id`
`POST /subscriptions`