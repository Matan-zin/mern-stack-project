## Authentication Service
---

### Build

To build this service seperatly from docker-compose,

#### Prerequisites:

- docker
- docker.socket active run `sudo systemctl status docker.socket` to verify

run on current directory:<br/>

```bash
$ sudo docker build -t auth-db-im ./auth-db/

$ sudo docker run -d --name auth-db -p 3306:3306 auth-db-im 

$ sudo docker build -t auth-svc-im ./auth-svc/ 

$ sudo docker run -d --name auth-svc -p 5050:5050 auth-svc-im 
```

### API

#### HTTP methods:

```
GET  /auth

GET  /auth/:id

PUT  /auth

DEL  /auth/:id

POST /auth

POST /auth/check-password
```
