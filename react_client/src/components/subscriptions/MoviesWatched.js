import { Link } from "react-router-dom";
import { get_data, update_data } from "../../services/services";
import { useState, useEffect } from "react";
import * as ROUTE from '../../constants/routes';


import Subscribe from "./Subscribe";

export default function MovieWatched({ _id, movies }) {

    const [expend ,setExpend] = useState(false);
    const [subscriptions, setSubscriptions] = useState(false);

    
    const _filter_subscriptions = (_subscriptions) => {
        return {
            _id: _subscriptions._id,
            movies: _subscriptions.movies.filter(movie => {
                if(movies.find(item => item._id === movie.movieId)) return movie;
            })
        }
    }
    useEffect(() => { 
        get_data('subscriptions', _id).then(res => {
            const _subs = _filter_subscriptions(res.data);
            if(_subs.movies.length !== res.data.movies.length) update_data('subscriptions', _subs);
            setSubscriptions(_subs)
        }).catch(err => console.log(err.message));
    // eslint-disable-next-line
    },[expend]);

    
    return (
        <>
        <h4>Movies Watched:</h4>
        <button
            type="button"
            onClick={() => setExpend(!expend)}> Subscribe to new movie </button>
        <>
        { expend && <Subscribe 
                        _id={_id}
                        movies={movies} 
                        setExpend={setExpend}
                        setSubscriptions={setSubscriptions}
                        subscriptions={subscriptions || { _id, movies: [], empty: true}}
                        /> 

        }
        </>
        { subscriptions &&
        <>
        { subscriptions.movies.map((movie, index) => {
            return (
                   <ul key={index}>
                    <li>
                    <Link to={`${ROUTE.MOVIES}#${movie.movieId}`}>
                    { movies.filter(item => item._id === movie.movieId)[0]?.name }
                    </Link>
                    <span> , { new Date(movie.date).toDateString()}</span> 
                    </li>
                   </ul>
            )
        })}
        </>
        }
        </>
    )
}