import { useState } from "react";
import { update_data } from '../../services/services';

export default function Subscribe({ 
    movies,
    setExpend,
    subscriptions })
{
    const [date, setDate] = useState(null);
    const [option, setOption] = useState(movies[0]['name']);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let movieId = movies.filter(movie => movie['name'] === option)[0]['_id'];
        subscriptions.movies.push({ movieId, date });
        try { await update_data('subscriptions', subscriptions); }
        catch(err) { console.error(err.message) }
        setExpend(false)
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
        <button type="submit">Subscribe</button>
        </form>
    )
}