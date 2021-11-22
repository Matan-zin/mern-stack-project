import * as util from 'util';
import restify from 'restify';
import { detailsRouter } from './routes/users-detail.mjs';
import { permissionsRouter } from './routes/users-permissions.mjs';

import DBG from 'debug';
const debug = DBG('users:app'); 
const error = DBG('users:app:error'); 

const server = restify.createServer({
    name: 'users-svc',
    version: '0.0.1'
});

// middlewares
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: true }));

// routes
detailsRouter(server);
permissionsRouter(server);

server.listen(process.env.PORT || 5858, () => {
    debug(`listening on ${server.url}`)
})

server.on('request', (req, res, next) => {
    console.log(req.url)
})

process.on('uncaughtException', function(err) { 
    console.error(`[uncaught exception] ${ err.stack || err }`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(`[unhandled rejection] ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});
