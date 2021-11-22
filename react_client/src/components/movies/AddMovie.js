import MovieForm from "./MovieForm"
import { useHistory } from "react-router"
import { create_data } from "../../services/services"

export default function AddMovie({ url }) {
    const history = useHistory()

    const handleSubmit = async (movie) => {
        create_data('movies', movie);
        history.push(url)
    }

    return (
        <>
        <MovieForm 
            handleSubmit={handleSubmit}
            btnName="Save"
            url={url}/>
        </>
    )
}