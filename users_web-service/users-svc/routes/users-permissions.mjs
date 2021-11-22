// import * as util from 'util';
import * as model from '../models/users-permissions.mjs';

// import DBG from 'debug';
// const debug = DBG('permissions:router');
// const error = DBG('permissions:router:error');


export async function permissionsRouter(server) {

    server.post(`/permissions`, async (req, res, next) => {
        try {
            const result = await model.createPermission(req);
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err)
        }
    });

    server.put(`/permissions`, async (req, res, next) => {
        try {
            const result = await model.updatePermission(req);

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    });

    server.get(`/permissions/:id`, async (req, res, next) => {
        try {
            const result = await model.findPermission(req.params.id);
            if(!result) res.send(404, new Error(`Not found permission ${req.params.id}`));

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(err);
        }
    });

    server.del(`/permissions/:id`, async (req, res, next) => {
        try {
            const result = await model.destroyPermission(req.params.id);
            if(!result) res.send(404, new Error(`Not found ${req.parmas.id} to delete`));

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(false);
        }
    });

    server.get(`/permissions`, async (req, res, next) => {
        try {
            const result = await model.listPermissions();

            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err);
            next(false);
        }
    });
}