import * as util from 'util';
import restify from 'restify';
import { createAdmin } from './createAdmin.mjs';
import { authRouter } from './route/auth.mjs';

import DBG from 'debug';
const debug = DBG('users:app'); 
// const error = DBG('users:app:error'); 

const server = restify.createServer({
    name: 'auth-svc',
    version: '0.0.1'
});

(() => { createAdmin().catch(err => err) })();

server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: true }));

authRouter(server);

server.listen(process.env.PORT, 
    process.env.SERVICE_URL || 'localhost', () => {
    console.log(`listening on ${server.url}`)
})

process.on('uncaughtException', function(err) { 
    console.error(`[uncaught exception] ${ err.stack || err }`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(`[unhandled rejection] ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});
