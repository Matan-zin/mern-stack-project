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
        ['First Name']: 'mat',
        ['Last Name']: 'zi',
        ['Created Date']: new Date(),
        ['Session Time Out']: 20
};


(async () => {

await (() => {
    return new Promise((resolve, reject) => {
        client().post(`/details`, { data: mock_obj },
            (err, req, res, data) => {
                const description = ' Should create user-details obj';
            try {
                assert(data.id === mock_obj.id)
                assert(data['First Name'] === mock_obj['First Name'])
                assert(data['Last Name']  === mock_obj['Last Name'])
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
        mock_obj['First Name'] = 'zuzu';
        client().put(`/details`, { data: mock_obj },
            (err, req, res, data) => {
                const description = ' Should update an existing user';
            try {
                assert(data.id === mock_obj.id)
                assert(data['First Name'] === mock_obj['First Name']);
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
        client().get(`/details/${mock_obj.id}`,
            (err, req, res, data) => {
                const description = ' Should find a user by given id';
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
        client().get(`/details`,
            (err, req, res, data) => {
                const description = ' Should list all users details';
            try {
                assert(data.length > 0)
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
        client().del(`/details/${mock_obj.id}`,
            (err, req, res, data) => {
                const description = ' Should destroy a user by given id';
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
