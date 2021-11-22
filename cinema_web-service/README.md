# Cinema Service
---

This is the main API that connect between all services to the client 

## Build

To build this service seperatly from docker-compose,

### Prerequisites:

- docker
- docker.socket active run `sudo systemctl status docker.socket` to verify

run on current directory:

``` 
sudo docker build -t cinema-svc-im . 
```
``` 
sudo docker run -d --name cinema-svc -p 3100:3100 cinema-svc-im 
```
