// import * as util from 'util';
import request from 'supertest';
import assert from 'assert';

// peedback emojys
const pass = '\u2705';
const unpass = '\u274c';

let global_id;

export async function movie_test(server) {
 

await request(server)
            .post('/movies')
            .send({
                name: 'Fast',
                genres: ["Drama", "Thriller"],
                image: 'http://fakeimage.jpg',
                premiered: new Date()
            })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.name      === 'Fast');
                assert(response.body.genres[1] === 'Thriller');
                assert(response.body.image     === 'http://fakeimage.jpg');
                global_id = response.body._id;
                console.log(pass + ' POST /movies');
            }).catch(err => console.log(unpass + ' POST /movies'));



await request(server)
            .put('/movies')
            .send({
                _id: global_id,
                name: 'Slow',
                genres: ['Drama', 'Action'],
                image: 'http://fakeimage-2.jpg',
                premiered: new Date()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body.name      === 'Slow');
                assert(response.body.genres[1] === 'Action');
                assert(response.body.image     === 'http://fakeimage-2.jpg');
                console.log(pass + ' PUT /movies');
            }).catch(e => console.log(unpass + ' PUT /movies'));
    


await request(server)
            .get('/movies')
            .expect('Content-Type', /json/)
            .expect('Server', 'sub-svc')
            .expect(200)
            .then(response => {
                assert(response.body.length > 0 );
                assert( 'premiered'  in response.body[0]);
                assert( 'genres'     in response.body[0]);   
                console.log(pass + ' GET /movies');
            })
            .catch(err => console.log(unpass + ' GET /movies') );



await request(server)
            .get('/movies?skip=0&limit=5')
            .expect('Content-Type', /json/)
            .expect('Server', 'sub-svc')
            .expect(200)
            .then(response => {
                assert(response.body.length === 5 );
                assert( 'premiered'  in response.body[0]);
                assert( 'genres'     in response.body[0]);   
                console.log(pass + ' GET /movies?skip=10&limit=5');
            })
            .catch(err => console.log(unpass + ' GET /movies?skip=10&limit=5') );
    


await request(server)
            .get(`/movies/${global_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                assert(response.body._id       === global_id);
                assert(response.body.name      === 'Slow');
                assert(response.body.genres[0] === 'Drama');
                assert(response.body.image     === 'http://fakeimage-2.jpg'); 
                console.log(pass + ' GET /movies/:id');
            }).catch(e => console.log(unpass + ' GET /movies/:id'));



await request(server)
            .del(`/movies/${global_id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {
                console.log(pass + ' DEL /movies/:id');
            }).catch(e => console.log(unpass + ' DEL /movies/:id'));

}