import axios from 'axios';
import bcrypt from 'bcryptjs';
import * as URLS from '../constants/urls';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF_TOKEN';   // according to express-csrf-protect repo
axios.defaults.xsrfHeaderName = 'X-XSRF_TOKEN'; // https://github.com/ryanwaite28/express-csrf-protect

const SALT_ROUNDS = 10;

const service_url = {
    'auth':          URLS.AUTH,
    'details':       URLS.DETAILS,
    'permissions':   URLS.PERMISSIONS,
    'members':       URLS.MEMBERS,
    'movies':        URLS.MOVIES,
    'subscriptions': URLS.SUBSCRIPTIONS
}

export async function hashpass(password) {
    const salt   = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

export async function login(username, password) {
    return await axios.post(URLS.LOGIN,{
                username,
                password 
            });
}

export async function signup(username, password) {
    return await axios.post(URLS.SIGN_UP, {
               username,
               password: await hashpass(password)
           });
}

export async function logout() {
    await axios.post(URLS.LOGOUT); }


export async function protected_route() {
    return await axios.get(URLS.PROTECTED); }

    
export async function get_data(svc, id) {
    if(id) return await axios.get(service_url[svc] + `/${id}`);
    return axios.get(service_url[svc]);
}
    

export async function create_data(svc, data) {
    return await axios.post(service_url[svc], { data }); }

    
export async function update_data(svc, data) {
    return await axios.put(service_url[svc], { data }); }


export async function delete_data(svc, id) {
    return await axios.delete(service_url[svc] + `/${id}`); }