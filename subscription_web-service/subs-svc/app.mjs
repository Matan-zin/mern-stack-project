import * as util from 'util';
import mongoose from 'mongoose';
import restify from 'restify';
import seed_db from './seed_db.mjs';

import { routeMovies  }       from './routes/movies.mjs';
import { routeMembers }       from './routes/members.mjs';
import { routeSubscriptions } from './routes/subscriptions.mjs';

import DBG from 'debug';
const debug = DBG('subscription:app'); 
const error = DBG('subscription:app:error'); 

export const server = restify.createServer({
    name: 'sub-svc',
    version: '0.0.1'
});

mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}`, (err) => {
    if(err) console.error(err);    
    else {
        console.log('connect to mongodb')
        seed_db(); 
    }
});

server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: true }));

routeMovies(server);
routeMembers(server);
routeSubscriptions(server);

server.listen(process.env.PORT || 3030, () => {
    debug(`listening on ${server.url}`)
})

process.on('uncaughtException', function(err) { 
    console.error(`[uncaught exception] ${ err.stack || err }`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(`[unhandled rejection] ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});
