import { useState } from "react"
import { useHistory } from "react-router-dom";


export default function MovieForm({
    movie,
    handleSubmit,
    btnName,
    url})
{
    const history = useHistory();
    const [tmpMovie, setTmpMovie] = useState(movie || {name: '',genres:[], image:'', premiered:''});

    const handleChange = ({ name, value }) => {
        if(name === 'genres'){
            setTmpMovie({...tmpMovie, [name]: value.split(' ') });
        } else {
            setTmpMovie({...tmpMovie, [name]: value });
        }
    }

    const handleLoclaSubmit = (event) => {
        event.preventDefault();
        handleSubmit(tmpMovie);
    }

    return (
        <form onSubmit={handleLoclaSubmit} className="movie-form">
        <label htmlFor="name">Name:</label>
        <input
            name="name"
            type="text"
            placeholder="Enter a name"
            value={tmpMovie.name}
            onChange={({ target }) => handleChange(target)} />
       <label htmlFor="genres">Genres:</label>
        <input
            name="genres"
            type="text"
            placeholder="Drama, Action"
            value={tmpMovie.genres}
            onChange={({ target }) => handleChange(target)} /> 
        <label htmlFor="image-url">Image url:</label>
        <input
            name="image-url"
            type="text"
            placeholder="Enter image url"
            value={tmpMovie.image}
            onChange={({ target }) => handleChange(target)} />
        <label htmlFor="premiered">Premeired:</label>
        <input
            name="premiered"
            type="date"
            value={tmpMovie.premiered}
            onChange={({ target }) => handleChange(target)} />
        <div className="inner-btns movie-btns">
        <button type="submit">{btnName}</button>
        <button 
            type="button"
            onClick={() => history.push(url)} >Cancel</button>
        </div>
        </form>
    )
}