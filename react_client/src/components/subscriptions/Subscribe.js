import { useState } from "react";
import { update_data, create_data } from '../../services/services';

export default function Subscribe({
    movies,
    setExpend,
    setSubscriptions,
    subscriptions })
{
    const [date, setDate] = useState(null);
    const [option, setOption] = useState(movies[0]['name']);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        let movieId = movies.filter(movie => movie['name'] === option)[0]['_id'];
        subscriptions.movies.push({ movieId, date });
        try { 'empty' in subscriptions
                ? await create_data('subscriptions', {_id : subscriptions._id, movies: subscriptions.movies }) 
                : await update_data('subscriptions', subscriptions) }
        catch(err) { console.error(err.message) }
        setSubscriptions(false);
        setExpend(false);
    }

    return (
        <form onSubmit={handleSubmit} className="sub-to-new">
        <label htmlFor="movies">Add new movie:</label>
        <select 
            name="movies"
            onClick={({ target }) => setOption(target.value)}
        >
        { movies.map((movie, index) => {
            return <option key={index} value={movie.name}>{movie.name} </option>
        })}
        </select>
        <input type="date" onChange={({ target }) => setDate(target.value)} />
        <button className="sub-iner-btn" type="submit">Subscribe</button>
        </form>
    )
}