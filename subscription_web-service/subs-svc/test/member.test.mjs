import * as util from 'util';
import request from 'supertest';
import assert from 'assert';

// peedback emojys
const pass = '\u2705';
const unpass = '\u274c';

let global_id;

export async function member_test(server) {
 

await request(server)
            .post('/members')
            .send({
                name: 'sam',
                email: 'ss@gmail.com',
                city: 'some'
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.name  === 'sam');
                assert(response.body.email === 'ss@gmail.com');
                assert(response.body.city  === 'some');
                global_id = response.body._id;
                console.log(pass + ' POST /members');
            }).catch(err => console.log(err.message+ unpass + ' POST /members'));



await request(server)
            .put('/members')
            .send({
                _id : global_id,
                name: 'david',
                email: 'dav@gmail.com',
                city: 'Tel-aviv'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.name  === 'david');
                assert(response.body.email === 'dav@gmail.com');
                assert(response.body.city  === 'Tel-aviv');
                console.log(pass + ' PUT /member');
            }).catch(e => console.log(unpass + ' PUT /members'));
    


        
await request(server)
            .get('/members')
            .expect('Content-Type', /json/)
            .expect('Server', 'sub-svc')
            .expect(200)
            .then(response => {
                assert(response.body.length === 11 );
                assert('name'  in response.body[0]);
                assert('email' in response.body[0]);   
                console.log(pass + ' GET /members');
            })
            .catch(err => console.log(unpass + ' GET /members') );
    



await request(server)
            .get(`/members/${global_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.name  === 'david');
                assert(response.body.email === 'dav@gmail.com');
                assert(response.body.city  === 'Tel-aviv'); 
                assert(response.body._id   === global_id);
                console.log(pass + ' GET /members/:id');
            }).catch(e => console.log(unpass + ' GET /members/:id'));


            
await request(server)
            .del(`/members/${global_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                console.log(pass + ' DEL /members/:id');
            }).catch(e => console.log(unpass + ' DEL /members/:id'));
}