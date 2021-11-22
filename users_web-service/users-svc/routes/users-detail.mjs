// import * as util from 'util';
import * as model from '../models/users-detail.mjs';

// import DBG from 'debug';
// const debug = DBG('detail:router');
// const error = DBG('detail:router:error');

export async function detailsRouter(server) {

    server.post(`/details`, async (req, res, next) => {
        try {
            const result = await model.createDetails(req); 

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });

    server.put(`/details`, async (req, res, next) => {
        try {
            const result = await model.updateDetails(req);

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });


    server.get(`/details/:id`, async (req, res, next) => {
        try {
            const result = await model.findDetails(req.params.id);
            if(!result) res.send(404, new Error(`Not found ${req.params.id}`));
            else {
                res.contentType = 'json';
                res.send(result);
            }
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });


    server.del(`/details/:id`, async (req, res, next) => {
        try {
            const result = await model.destroyDetails(req.params.id);
            if(!result) res.send(404, new Error(`Not found ${req.params.id}`));
            else {
                res.contentType = 'json';
                res.send(result);
            }
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });


    server.get(`/details`, async (req, res, next) => {
        try {
            const result = await model.listDetails();

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });
}