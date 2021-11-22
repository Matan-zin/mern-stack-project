// import * as util from 'util';
import request from 'supertest';
import assert  from 'assert';

// peedback emojys
const pass   = '\u2705';
const unpass = '\u274c';

let sub_mock = {
    memberId: 'abc1234',
    movies: [ 
        { movieId: 'ab11', date: new Date() },
        { movieId: 'ab12', date: new Date() },
        { movieId: 'ab13', date: new Date() },
        { movieId: 'ab14', date: new Date() }
     ]
};

export async function subscription_test(server) {
 

await request(server)
            .post('/subscriptions')
            .send(sub_mock)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.memberId  === 'abc1234');
                assert(response.body.movies[1].movieId === 'ab12');
                sub_mock._id = response.body._id;
                console.log(pass + ' POST /subscriptions');
            }).catch(err => console.log(unpass + ' POST /subscriptions'));



sub_mock.movies[1].movieId = 'ab33';
await request(server)
            .put('/subscriptions')
            .send(sub_mock)
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.memberId  === 'abc1234');
                assert(response.body.movies[1].movieId === 'ab33');
                console.log(pass + ' PUT /subscriptions');
            }).catch(e => console.log(unpass + ' PUT /subscriptions'));
    


await request(server)
            .get('/subscriptions')
            .expect('Content-Type', /json/)
            .expect('Server', 'sub-svc')
            .expect(200)
            .then(response => {
                assert( response.body.length === 11 );
                assert( 'memberId' in response.body[0]);
                assert( 'movies'   in response.body[0]);   
                console.log(pass   + ' GET /subscriptions');
            })
            .catch(err => console.log(unpass + ' GET /subscriptions') );
    

            

await request(server)
            .get(`/subscriptions/${sub_mock._id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.memberId  === 'abc1234');
                assert(response.body.movies[1].movieId === 'ab33');
                console.log(pass + ' GET /subscriptions/:id');
            }).catch(e => console.log(unpass + ' GET /subscriptions/:id'));



await request(server)
            .del(`/subscriptions/${sub_mock._id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                console.log(pass + ' DEL /subscriptions/:id');
            }).catch(e => console.log(unpass + ' DEL /subscriptions/:id'));


}