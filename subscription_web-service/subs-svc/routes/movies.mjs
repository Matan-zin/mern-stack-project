import { movies as model } from "../models/movies.mjs";

const moviesParams = (req) => {
    return {
        _id :      req.body.data._id,
        name:      req.body.data.name,
        genres:    req.body.data.genres,
        image:     req.body.data.image,
        premiered: req.body.data.premiered
    }
}

export async function routeMovies(server) {

    server.post(`/movies`, async (req, res, next) => {
        try {
            const result = await model.create(moviesParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.put(`/movies`, async (req, res, next) => {
        try {
            const result = await model.update(moviesParams(req));
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.get(`/movies/:id`, async (req, res, next) => {
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

    server.get(`/movies`, async (req, res, next) => {
        try {
            let result;
            if(req.query) result = await model.querylist(req.query);
            else result = await model.list();
            
            res.contentType = 'json';
            res.send(result);
            next(false);
        } catch(err) {
            res.send(500, err.message);
            next(err);
        }
    });

    server.del(`/movies/:id`, async (req, res, next) => {
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