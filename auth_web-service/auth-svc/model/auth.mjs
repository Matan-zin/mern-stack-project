// import * as util from 'util';
import jsyaml from 'js-yaml';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import { promises as fs } from 'fs';

import DBG from 'debug';
const debug = DBG('users:model');
const error = DBG('error:users:model');

let sequlz;

export class SQUsers extends Sequelize.Model { }

export async function connectDB() {
    if(sequlz) return sequlz;
    try {
        const ymltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');
        const params = jsyaml.load(ymltext, 'utf8');
        
        sequlz = new Sequelize( params.dbname,   params.username,
                                params.password, params.params  );
        
        SQUsers.init({
            id: { 
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true
            },
            username: { type: Sequelize.STRING, unique: true },
            password: Sequelize.STRING
        }, {
            sequelize: sequlz,
            modelName: 'SQUsers'
        });
        await SQUsers.sync()
    } catch(err) {
        error(err)
    }
}

export function userParams(req) {
    return {
        id:       req.body?.data?.id       || req.body.id,
        username: req.body?.data?.username || req.body.username,
        password: req.body?.data?.password || req.body.password
    }
}

export function sanitizedUser(user) {
    return {
        id:       user.id,
        username: user.username
    }
}



export async function createUser(req) {
    await connectDB();
    const user = userParams(req);
    
    await SQUsers.create(user);
    const res = await SQUsers.findByPk(user.id);
    return sanitizedUser(res);
}


export async function findUser(id) {
    await connectDB();
    const user = await SQUsers.findByPk(id);
    return user ? sanitizedUser(user) : undefined;
}


export async function queryUser(query) {
    await connectDB();
    const [[key, value]] = Object.entries(query);
    const user = await SQUsers.findOne({ where: { [key]: value }});

    return user ? sanitizedUser(user) : undefined;
}


export async function updateUser(req) {
    await connectDB();
    const user = userParams(req);
    await SQUsers.update(user, { where: { id: user.id }});

    const res = await SQUsers.findOne({ where: { username: user.username }});
    return sanitizedUser(res);
}


export async function destroyUser(id) {
    await connectDB();
    const user = await SQUsers.findByPk(id);
    return user ? user.destroy() : {};
}


export async function listUsers() {
    await connectDB();
    let userlist = await SQUsers.findAll({});
    userlist = userlist.map(user => sanitizedUser(user));

    return userlist ? userlist : [];
}


export async function checkPassword(req) {
    await connectDB();
    const user = await SQUsers.findOne({ where: { username: req.params.username } });
    let msg = { 
            check: false, username: req.params.username,
            message: "Incorrect username or password" 
        };
    if (user) {
        let pwcheck = false;
        if (user.username === req.params.username) {
            pwcheck = await bcrypt.compare(req.params.password, user.password);
        }
        if (pwcheck) msg = { check: true, id: user.id, username: user.username };
    }
    return msg;
}