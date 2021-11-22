import { promises as fs } from 'fs';
import { readFile } from '../halpers/readFIle.mjs';
import { approotdir } from '../approotdir.mjs';

const NOT_FOUND = -1;
const FILE_NAME = 'permissions.json';
const PATH      = approotdir + '/users-fs/' + FILE_NAME;

// import DBG from 'debug';
// const debug = DBG('permissions:model');
// const error = DBG('permissions:model:error');



const sanitizedPermissions = (req) => {
    return {
        id:                       req.body.data.id,
        ['View Movies']:          req.body.data['View Movies'],
        ['Create Movies']:        req.body.data['Create Movies'],
        ['Delete Movies']:        req.body.data['Delete Movies'],
        ['Update Movies']:        req.body.data['Update Movies'],
        ['View Subscriptions']:   req.body.data['View Subscriptions'],
        ['Create Subscriptions']: req.body.data['Create Subscriptions'],
        ['Delete Subscriptions']: req.body.data['Delete Subscriptions'],
        ['Update Subscriptions']: req.body.data['Update Subscriptions']
    }
}


export async function createPermission(req) {
    const perm = sanitizedPermissions(req);
    const permlist = await readFile(PATH);
    if(!permlist) permlist = [];

    permlist.push(perm);
    await fs.writeFile(PATH, JSON.stringify(permlist));
    return perm;
}


export async function updatePermission(req) {
    const perm = sanitizedPermissions(req);
    const permlist = await readFile(PATH);

    const i = permlist.findIndex(elem => elem.id === perm.id);
    if(i !== NOT_FOUND) {
        permlist[i] = perm;
        await fs.writeFile(PATH, JSON.stringify(permlist));
    }
    return perm;
}


export async function findPermission(id) {
    const permlist = await readFile(PATH);

    const i = permlist.findIndex(elem => elem.id === id);
    if(i !== NOT_FOUND) {
        return permlist[i];
    }
    return i;
}


export async function destroyPermission(id) {
    const permlist = await readFile(PATH);

    const i = permlist.findIndex(elem => elem.id === id);
    if(i !== NOT_FOUND) {
        delete permlist[i];
        const newlist = permlist.filter(Boolean);
        await fs.writeFile(PATH, JSON.stringify(newlist))
        
        return {};
    }
}


export async function listPermissions() {
    const permlist = await readFile(PATH);
    return permlist.filter(item => !item.hasOwnProperty('admin'));
}