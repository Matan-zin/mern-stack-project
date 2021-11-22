import fs from 'fs';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import { approotdir } from '../approotdir.mjs';
import { details as model } from './details.mjs';

const path_to_key = approotdir + '/id_rsa_priv.pem';

const PRIV_KEY = fs.readFileSync(path_to_key);

const reqUrl = (path) => {
    const requrl = new URL(process.env.AUTH_SVC_URL);
    requrl.pathname = path;
    return requrl.toString();
}


export async function Signup(user_name, password) {
    // First check if admin add this username to the database 
    // after check if this user dosen't register yet by verfied his password
    let res = await superagent.get(reqUrl(`/auth`)+(`?username=${user_name}`));
    const { id, username } = res.body;
    if(username === user_name) {
        res = await superagent.post(reqUrl(`/auth/check-password`), { username, password: process.env.ADMIN_FPSWD });
    }
    let res2 = undefined;
    if(res.body.check) {
        res2 = await superagent.put(reqUrl(`/auth`), { 
            id,
            username,
            password
        });
    }
    return res2?.body.username ? res2.body : undefined;
}


export async function Login(username, password) {
    // First check if the credentials are correct then create a token
    let res = await superagent.post(reqUrl(`/auth/check-password`), { username, password });
    let result = { checked: res.body };
    if(!result.checked?.check) return undefined;
    
    const userDetails = await model.get(result.checked.id);
    // if normal user expire by his Session Time Out field else verfied this is an admin
    const expire = userDetails['Session Time Out'] ? userDetails['Session Time Out'] + 'm' : userDetails['admin'] ? '1d' : undefined;
    const claims = { sub: result.checked.id };
    result['token'] = jwt.sign(claims, PRIV_KEY, { expiresIn: expire, algorithm: 'RS256' });
    return result;
}



export async function destroy(id) {
    const res = await superagent.del(reqUrl(`/auth/${id}`));
    return res.body;
}

export async function create(data) {
    const res = await superagent.post(reqUrl('/auth'), { data });
    return res.body;
}