import express from 'express';
import passport from 'passport';

import * as model from '../models/auth.mjs';
export const router = express.Router();

export const COOKIE_NAME = 'jwt';


router.get('/protected', passport.authenticate(COOKIE_NAME, { session: false }), 
    (req, res, next) => { res.status(200).send({ success: true }) });



router.post('/logout', async(req, res, next) => {
    res.clearCookie(COOKIE_NAME)
    res.json('logout')
})



router.post('/signup',async (req ,res, next) => {
    const { username, password } = req.body;
try {
    const result = await model.Signup(username, password);
    if(!result) res.status(403).json('username are not valid contact with system administraitor'); 
    else res.json(result);
} catch(err) { res.status(500).json(err.message) }});
    



router.post('/login',async (req, res, next) => {
    const { username, password } = req.body;
try {
    const result = await model.Login(username, password);
    if(!result) res.status(403).json('username or password are incorrect');
    else {
        res.cookie(COOKIE_NAME, result.token, { signed: true, sameSite: 'none', secure: true });
        res.json({ success: result.checked });
    }
} catch(err) { res.status(500).json(err.message) }});




router.delete('/:id', passport.authenticate(COOKIE_NAME, { session: false }),
 async (req, res, next) => {
    const { id } = req.params;
try {
    const result = await model.destroy(id);
    res.status(200).json(result)
} catch(err) { res.status(500).json(err.message) }});




router.post('/', passport.authenticate(COOKIE_NAME, { session: false }),
 async (req, res, next) => {
try {
    const result = await model.create(req.body.data);
    res.status(201).json(result)
} catch(err) { res.status(500).json(err.message) }});
