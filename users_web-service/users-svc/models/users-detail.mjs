// import * as util from 'util';
import { promises as fs } from 'fs';
import { readFile } from '../halpers/readFIle.mjs';
import { approotdir } from '../approotdir.mjs';

const NOT_FOUND = -1;
const FILE_NAME = 'users-detail.json';
const PATH      = approotdir + '/users-fs/' + FILE_NAME;

// import DBG from 'debug';
// const debug = DBG('detalis:model');
// const error = DBG('details:model:error');


const sanitizedDetails = (req) => {
    return {
        id:                   req.body.data.id,
        ['First Name']:       req.body.data['First Name'],
        ['Last Name']:        req.body.data['Last Name'],
        ['Email']:            req.body.data['Email'],  
        ['Created Date']:     req.body.data['Created Date'],
        ['Session Time Out']: req.body.data['Session Time Out']
    }
}


export async function createDetails(req) {
    const user = sanitizedDetails(req);
    const userslist = await readFile(PATH);
    
    if(!userslist) userslist = [];
    userslist.push(user);

    await fs.writeFile(PATH, JSON.stringify(userslist));
    return user;
}


export async function updateDetails(req) {
    const user = sanitizedDetails(req);
    const userlist = await readFile(PATH);

    const i = userlist.findIndex(elem => elem.id === user.id);
    if(i !== NOT_FOUND) {
        userlist[i] = user;
        await fs.writeFile(PATH, JSON.stringify( userlist ));
        return user;
    }
}


export async function findDetails(id) {
    const userlist = await readFile(PATH);
    const i = userlist.findIndex(elem => elem.id === id);
   
    return ( i !== NOT_FOUND ) ? userlist[i] : undefined;
}


export async function destroyDetails(id) {
    const userlist = await readFile(PATH);
    
    const i = userlist.findIndex(elem => elem.id === id);
    if(i !== NOT_FOUND) {
        delete userlist[i];
        const newlist = userlist.filter(Boolean);
        
        await fs.writeFile(PATH, JSON.stringify( newlist ), 'utf-8');
        return {};
    }
}


export async function listDetails() {
    const userlist = await readFile(PATH);
    return userlist.filter(item => !item.hasOwnProperty('admin'));
}