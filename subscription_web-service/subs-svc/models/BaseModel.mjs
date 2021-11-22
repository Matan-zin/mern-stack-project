// import * as util from 'util';
import mongoose from 'mongoose';
import { sanitizedObj } from '../halpers/sanitizedObj.mjs';

// import DBG from 'debug';
// const debug = DBG('basemodel:log');
// const error = DBG('basemodel:error');

const _model = Symbol('model');
const _name  = Symbol('name');

export class BaseModel {
    constructor(name ,schema) {
        const _schema = new mongoose.Schema(schema);
        this[_model] = mongoose.model(name, _schema);
        this[_name] = name;
    }
    
    async create(doc) {             
        const newdoc = new this[_model](doc);
        const res = await newdoc.save();
        return sanitizedObj(this[_name], res);
    }

    async find(id) {
        const res = await this[_model].findById(id);
        return sanitizedObj(this[_name], res);
    }

    async queryname(name, value) {
        const res = await this[_model].find({ [name]: value });
        return sanitizedObj(this[_name], res);
    }

    async update(doc) {
        await this[_model].findByIdAndUpdate(doc._id, doc);
        const res = await this[_model].findById(doc._id);
        return sanitizedObj(this[_name], res);
    }

    async destroy(id) { 
        const res = await this[_model].findByIdAndRemove(id);
        return res;
    }

    async list() {
        const res = await this[_model].find();
        const list = res.map(item => sanitizedObj(this[_name], item));
        return list;
    }

    async querylist(query) {
        const res = await this[_model].find()
                                      .skip( query.skip  ? Number(query.skip)  : undefined)
                                      .limit(query.limit ? Number(query.limit) : undefined);
        const list = res.map(item => sanitizedObj(this[_name], item));
        return list;
    }

    async count() {
        const res = await this[_model].count();
        return res;
    }
} 