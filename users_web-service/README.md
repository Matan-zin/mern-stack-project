# Users Service
---

## Build

To build this service seperatly from docker-compose,

### Prerequisites:

- docker
- docker.socket active run `sudo systemctl status docker.socket` to verify

run on current directory:<br/>

`
$ sudo docker build -t users-svc-im ./users-svc/ 
`<br/>
`
$ sudo docker run -d --name users-svc -p 5858:5858 users-svc-im 
`<br/>


## API

### HTTP methods:


```
GET  /details
GET  /details/:id
PUT  /details
DEL  /details/:id
POST /details
```

```
GET  /permissions
GET  /permissions/:id
PUT  /permissions
DEL  /permissions/:id
POST /permissions
```
