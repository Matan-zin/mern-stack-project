import axios from 'axios';
import { members } from './models/members.mjs';
import { movies  } from './models/movies.mjs';
import { subscriptions } from './models/subscriptions.mjs';
import { sanitizedMember, sanitizedMovie } from './halpers/sanitizedObj.mjs';

const gen_rand_id = () => {
    // 4 rendom numbers between 0 - 9
    const i = Math.floor((Math.random() * 4 ) + 1);
    return [ i , i + 2, i + 3 , i + 4 ];
}

export default async function seed_db() {

    let check = await Promise.all([members.count(), movies.count(), subscriptions.count()]);
    if(check[0] > 0 || check[1] > 0 || check[2] > 0) return;

    const resm = await axios.get('https://jsonplaceholder.typicode.com/users');
    const promise_members = resm.data.map(mem => members.create(sanitizedMember(mem)));
    const members_li = await Promise.all(promise_members);

    const resv = await axios.get('https://api.tvmaze.com/shows');
    let promise_movies = [10];
    for(let i = 0; i < 10; i++ ) promise_movies[i] = movies.create(sanitizedMovie(resv.data[i]));
    const movies_li = await Promise.all(promise_movies);

    const promise_subs = members_li.map(mem => {
        let [ a, b, c, d ] = gen_rand_id();
        let sub = {
            _id: mem._id ,
            movies: [
                { movieId: movies_li[a]._id , date: movies_li[a].premiered },
                { movieId: movies_li[b]._id , date: movies_li[b].premiered },
                { movieId: movies_li[c]._id , date: movies_li[c].premiered },
                { movieId: movies_li[d]._id , date: movies_li[d].premiered }
            ]
        }
        return subscriptions.create(sub)
    });
    await Promise.all(promise_subs);
}