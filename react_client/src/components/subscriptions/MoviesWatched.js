
import { Link } from "react-router-dom";
import { get_data } from "../../services/services";
import { useState, useEffect } from "react";
import * as ROUTE from '../../constants/routes';

import Skeleton from "react-loading-skeleton"
import Subscribe from "./Subscribe";

export default function MovieWatched({ _id, movies }) {

    const [expend ,setExpend] = useState(false);
    const [subscriptions, setSubscriptions] = useState(false);

    useEffect(() => { 
        get_data('subscriptions', _id).then(res => setSubscriptions(res.data)).catch(err => console.log(err.message));
    // eslint-disable-next-line
    },[]);

    return (
        <>
        { !subscriptions ? ( <Skeleton count={1} /> ) : (
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
                        subscriptions={subscriptions}
                        /> 

        }
        </>
        { subscriptions.movies.map((movie, index) => {
            return (
                   <ul key={index}>
                    <li>
                    <Link to={`${ROUTE.MOVIES}#${movie.movieId}`}>
                    { movies.filter(item => item._id === movie.movieId)[0]?.name }
                    </Link>
                    <span> , {new Date(movie.date).toDateString()}</span>
                    </li>
                   </ul>
            )
        })}
        </>
        )}
        </>
    )
}