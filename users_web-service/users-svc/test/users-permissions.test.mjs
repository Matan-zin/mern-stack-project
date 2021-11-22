import restify from 'restify-clients';
import assert from 'assert';
import { v4 as uuid } from 'uuid';

const pass = '\u2705';
const unpass = '\u274c';


const client = () => {
    let connect_url = new URL('http://localhost:5858');

    let client = restify.createJsonClient({
        url: connect_url.href,
        version: '0.0.1'
    });
    return client;
}

const mock_obj = {
    id: uuid(),
    ['View Movies']: true,
    ['Create Movies']: true,
    ['Delete Movies']: true,
    ['Update Movies']: true,
    ['View Subscriptions']: true,
    ['Create Subscriptions']: true,
    ['Delete Subscriptions']: true,
    ['Update Subscriptions']: true
};


(async () => {

await (() => {
    return new Promise((resolve, reject) => {
        client().post(`/permissions`, { data: mock_obj },
            async (err, req, res, data) => {
                const description = ' Should create user-permission obj';
            try {
                assert(data.id === mock_obj.id)
                assert(data['View Movies']   === mock_obj['View Movies'])
                assert(data['Create Movies'] === mock_obj['Create Movies'])
                console.log(pass + description)
                resolve(true)
            } catch(e) {
                console.log(unpass + description)
                reject(e)
            }});
    });
})();

await (() => {
    return new Promise((resolve, reject) => {
        mock_obj['View Movies'] = false;
        client().put(`/permissions`, { data: mock_obj },
            async (err, req, res, data) => {
                const description = ' Should update an existing permission';
            try {
                assert(data.id === mock_obj.id)
                assert(data['View Movies'] === mock_obj['View Movies']);
                console.log(pass + description);
                resolve(true)
            } catch(e) {
                console.log(unpass + description)
                reject(e)
            }});
    });
})();

await (() => {
    return new Promise((resolve, reject) => {
        client().get(`/permissions/${mock_obj.id}`,
            async (err, req, res, data) => {
                const description = ' Should find a permission by given id';
            try {
                assert(data.id === mock_obj.id)
                console.log(pass + description);
                resolve(true)
            } catch(e) {
                console.log(unpass + description)
                reject(e)
            }});
    });
})();

await (() => {
    return new Promise((resolve, reject) => {
        client().get(`/permissions`,
            async (err, req, res, data) => {
                const description = ' Should list all users permissions';
            try {
                assert(data.length > 0);
                assert(Array.isArray(data));
                console.log(pass + description);
                resolve(true)
            } catch(e) {
                console.log(unpass + description)
                reject(e)
            }});
    });
})();


await (() => {
    return new Promise((resolve, reject) => {
        client().del(`/permissions/${mock_obj.id}`,
            async (err, req, res, data) => {
                const description = ' Should destroy a user permisison by given id';
            try {
                assert(data.length === undefined)
                console.log(pass + description);
                resolve(true)
            } catch(e) {
                console.log(unpass + description)
                reject(e)
            }});
    });
})();

})();
