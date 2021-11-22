import { members as model } from "../models/members.mjs";

const membersParams = (req) => {
    return {
        _id :  req.body.data._id,
        name:  req.body.data.name,
        email: req.body.data.email,
        city:  req.body.data.city
    }
}

export async function routeMembers(server) {

    server.post(`/members`, async (req, res, next) => {
        try {
            const result = await model.create(membersParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.put(`/members`, async (req, res, next) => {
        try {
            const result = await model.update(req.params._id ,membersParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.get(`/members/:id`, async (req, res, next) => {
        try {
            const result = await model.find(req.params.id);
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.get(`/members`, async (req, res, next) => {
        try {
            const result = await model.list();
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.del(`/members/:id`, async (req, res, next) => {
        try {
            const result = await model.destroy(req.params.id);
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    })
}