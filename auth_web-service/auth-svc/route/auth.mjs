// import * as util from 'util';
import * as model from '../model/auth.mjs';

import DBG from 'debug';
const debug = DBG('users:router'); 
const error = DBG('users:router:error');



export async function authRouter(server) {

    server.post(`/auth`, async (req, res, next) => {
        try {
            const result = await model.createUser(req);

            res.contentType ='json';
            res.send(result);
            next(false);
        } catch(err) {
            if(err.message.includes('Validation')) res.send(409, err.message);
            else res.send(500, err.message);
            next(err);
        }
    });

    server.put(`/auth`, async (req, res, next) => {
        try {
            let user = await model.updateUser(req);

            res.contentType = 'json';
            res.send(user);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    });

    server.del(`/auth/:id`, async (req, res, next) => {
        try {
            let user = model.destroyUser(req.params.id);
            if(!user) res.send(404, new Error(`Not found ${req.params.id} to delete`));
            else {
                res.contentType = 'json';
                res.send(user);
            }
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    });

    server.get(`/auth/:id`, async (req, res, next) => {
        try {
            let user = await model.findUser(req.params.id);
            if(!user) res.send(404, new Error(`Not found`));
            else {                
                res.contentType = 'json';
                res.send(user);
            }
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    })

    server.get(`/auth`, async (req, res, next) => {
        try {
            let result;
            if(Object.keys(req.query).length > 0) {
                result = await model.queryUser(req.query);
            }
            else result = await model.listUsers();
            
            if(!result) res.send(404, new Error(`Not found ${req.query}`));
            else {
                res.contentType = 'json';
                res.send(result);
            }
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    })

    server.post(`/auth/check-password`, async (req, res, next) => {
        try {
            const msg = await model.checkPassword(req);

            res.contentType = 'json';
            res.send(msg);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    })

}