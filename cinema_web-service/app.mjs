import fs from 'fs';
import cors from 'cors';
import http from 'http';
import logger from 'morgan';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { approotdir } from './approotdir.mjs';
import { configPassport } from './config/passport.mjs';
import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.mjs';

import { router as authRouter  }         from './routes/auth.mjs';
import { router as moviesRouter }        from './routes/movies.mjs';
import { router as membersRouter }       from './routes/members.mjs';
import { router as detailsRouter }       from './routes/details.mjs';
import { router as permissionsRouter }   from './routes/permissions.mjs';
import { router as subscriptionsRouter } from './routes/subscriptions.mjs';

import DBG from 'debug';
const debug = DBG('cinema:app');
const error = DBG('cinema:app:error');

const PRIV_KEY = fs.readFileSync(approotdir + '/id_rsa_priv.pem')
export const app = express();

configPassport(passport);

app.use(passport.initialize());
app.use(cors({ origin: true , credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(PRIV_KEY.toString()));


app.use('/auth',         authRouter);
app.use('/movies',       moviesRouter);
app.use('/members',      membersRouter);
app.use('/details',      detailsRouter);
app.use('/permissions',  permissionsRouter);
app.use('/subscriptions',subscriptionsRouter);


app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);