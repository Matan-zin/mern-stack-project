import passport from 'passport'
import express from 'express';
export const router = express.Router();
import { COOKIE_NAME } from './auth.mjs';
import { subscriptions as model } from '../models/subscriptions.mjs';

router.use(passport.authenticate(COOKIE_NAME, { session: false }));



router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
try {
    const result = await model.get(id);
    if(!result) res.status(404).json('subscriptions not found');
    else res.status(200).json(result);
}
catch(err) {res.status(500).json(err.message)}});


router.get('/', async (req, res, next) => {
try {
    const result = await model.get();
    if(!result) res.status(404).json('subscriptions not found');
    else res.status(200).json(result);
}
catch(err) {res.status(500).json(err.message)}});


router.post('/', async (req, res, next) => {
try {
    const result = await model.create(req.body);
    if(!result) res.status(404).json('subscriptions not found');
    else res.status(201).json(result);
}
catch(err) {res.status(500).json(err.message)}});


router.put('/', async (req, res, next) => {
try {
    const result = await model.update(req.body);
    if(!result) res.status(404).json('subscriptions not found');
    else res.status(201).json(result);
}
catch(err) {console.log(err);res.status(500).json(err.message)}});



router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
try {
    const result = await model.destroy(id);
    res.status(200).json(result);
}
catch(err) {res.status(500).json(err.message)}});