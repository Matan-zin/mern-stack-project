import Skeleton from "react-loading-skeleton";
import MovieForm from "./MovieForm";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { update_data, get_data } from "../../services/services";

export default function EditMovie({ url }) {

    const history = useHistory();
    const id = JSON.parse(sessionStorage.getItem('id'));

    const [movie, setMovie] = useState(false);

    useEffect(() => {
        get_data('movies', id).then(res => setMovie(res.data)).catch(err => console.error(err.message));
        
        return () => sessionStorage.removeItem('id');
    // eslint-disable-next-line
    }, []);

    const handleSubmit = async (movie) => {
        update_data('movies', movie);

        history.push(url)
    }

    return (
        <>
        { !movie ? ( <Skeleton count={1} /> ) : (
        
        <MovieForm
            movie={movie}
            btnName='Update'
            handleSubmit={handleSubmit}
            url={url}/>
        )}
        </>
    )
}