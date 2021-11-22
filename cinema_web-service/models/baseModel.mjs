import superagent from 'superagent';

const service_urls = {
    'details':       process.env.USERS_SVC_URL,
    'permissions':   process.env.USERS_SVC_URL,
    'members':       process.env.SUBS_SVC_URL,
    'movies':        process.env.SUBS_SVC_URL,
    'subscriptions': process.env.SUBS_SVC_URL
}

const _name   = Symbol('name');
const _requrl = Symbol('requrl');


export default class baseModel {
    constructor(service_name) {
        this[_name]   = service_name;
        this[_requrl] = (path) => {
            const requrl = new URL(service_urls[service_name]);
            requrl.pathname = path;
            return requrl.toString();
        }
    }

    async create(data) { 
        return new Promise((resolve, reject) => {
            superagent
                .post(this[_requrl](`/${this[_name]}`))
                .send(data)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err) reject(err.message);
                    resolve(res.body);
                });
        });
    }
    
    async update(data) {
        return new Promise((resolve, reject) => {
            superagent
                .put(this[_requrl](`/${this[_name]}`))
                .send(data)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err) reject(err.message);
                    resolve(res.body);
                });
        });
    }

    async get(id) {
        const url = id ? this[_requrl](`/${this[_name]}/${id}`) 
                       : this[_requrl](`/${this[_name]}`);
        console.log(url)
        return new Promise((resolve, reject) => {
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err) reject(err.message);
                    resolve(res.body);
                });
        });
    }

    async destroy(id) {
        return new Promise((resolve, reject) => {
            superagent
                .del(this[_requrl](`/${this[_name]}/${id}`))
                .end((err, res) => {
                    if(err) reject(err.message);
                    resolve(res.body);
                });
        });
    }
}