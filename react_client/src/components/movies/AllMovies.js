import Skeleton from "react-loading-skeleton";
import { EDIT_MOVIE } from "../../constants/routes";
import { useEffect, useState } from "react";
import { get_data, delete_data } from '../../services/services'
import { useHistory, useLocation } from "react-router-dom";

import SubsricptionWatched from "./SubscriptionWatched";

export default function AllMovies({ url, isDeleteVisible }) {

    const history = useHistory();
    const { hash } = useLocation();

    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState(false);
    const [movieList, setMovieList] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        get_data('movies').then(res => setMovies(res.data)).catch(err => console.error(err.message));
    }, [refresh]);

    useEffect(() => {
        if( hash ) setTimeout(() => window.location.assign(url + hash), 200);
        //eslint-disable-next-line
    },[hash])

    useEffect(() => {
        if(movies){
            let res = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()))
            setMovieList(res)
        }
    }, [search, movies])


    const handleDelete = async (id) => {
        delete_data("movies", id);
        setMovies(false);
        setRefresh(!refresh);
    }

    const storeId = (docId) => {
        sessionStorage.setItem('id', JSON.stringify(docId));
        history.push(url + EDIT_MOVIE);
    }

    return (
        <>
        { !movieList ? ( <Skeleton count={4} /> ) : (
        <>
        <label htmlFor="search movie">Search Movie:</label>
        <input
             name="search movie"
             type="text"
             onChange={({ target }) => setSearch(target.value)} />
        <div className="list">
        { movieList.map((movie, index) => {
            return (
                <div className="movie-card" key={index}>
                <section id={movie._id} aria-label="movie details">
                <h4>{movie.name} ,<time date={movie.premiered}>{movie.premiered.substring(0,4)}</time></h4>
                <p>genres: 
                { movie.genres.map((genre, index) => {
                      return <span key={index}>{` `}{genre}</span>
                  })}
                </p>
                <img src={movie.image} alt={movie.name} />
                <SubsricptionWatched _id={movie._id} />

                <div className="movie-btns">
                <button
                    type="button"
                    onClick={() => storeId(movie._id)}>Edit</button>

                { isDeleteVisible &&
                <button
                    type="button"
                    onClick={() => handleDelete(movie._id)}>Delete</button>
                }
                </div>
                </section>
                </div>
            )    
          })
        }
        </div>
        </>
        )}
        </>
    )
}