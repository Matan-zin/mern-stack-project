import { subscriptions as model } from "../models/subscriptions.mjs";

const subscriptionsParams = (req) => {
    return {
        _id:      req.body.data._id,
        movies:   req.body.data.movies,
    }
}

export async function routeSubscriptions(server) {

    server.post(`/subscriptions`, async (req, res, next) => {
        try {
            const result = await model.create(subscriptionsParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.put(`/subscriptions`, async (req, res, next) => {
        try {
            const result = await model.update(subscriptionsParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.get(`/subscriptions/:id`, async (req, res, next) => {
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

    server.get(`/subscriptions`, async (req, res, next) => {
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


    server.del(`/subscriptions/:id`, async (req, res, next) => {
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