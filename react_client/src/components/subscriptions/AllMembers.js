
import Skeleton from "react-loading-skeleton"
import { useEffect, useState } from "react";
import * as ROUTE from "../../constants/routes";
import { useHistory, useLocation } from "react-router-dom";
import { delete_data, get_data } from "../../services/services";

import MovieWatched from "./MoviesWatched";

export default function AllMembers({ url , isDeleteVisible}) {

    const [movies,  setMovies]  = useState(false);
    const [members, setMembers] = useState(false);

    const history = useHistory();
    const { hash } = useLocation();

    useEffect(() => {
        get_data('movies' ).then(res => setMovies(res.data) ).catch(err => console.error(err.message));
        get_data('members').then(res => setMembers(res.data)).catch(err => console.error(err.message));
    },[]);

    useEffect(() => {
       if( hash ) setTimeout(() => window.location.assign(url + hash), 200);
       //eslint-disable-next-line
    },[hash])

    const handleEdit = (id) => {
        sessionStorage.setItem('id', id);
        history.push(url + ROUTE.EDIT_MEMBER)
    }

    const handleDelete = async (id) => {
        delete_data('movies',  id).catch(err => console.error(err.message));
        delete_data('members', id).catch(err => console.error(err.message));
    }

    return (
        <>
        { !(members && movies) ? (<Skeleton count={2} />) : (
        <>
        { members.map(member => {
            return (
                <div key={member._id} id={member._id} className="member-card">
                <h3>{member.name}</h3>
                <p>Email: {member.email}</p>
                <p>City:  {member.city}</p>

                <div className="member-btns">
                <button
                    type="button"
                    onClick={() => handleEdit(member._id)}>Edit</button>
                { isDeleteVisible &&   
                <button
                    type="button"
                    onClick={() => handleDelete(member._id)}>Delete</button> }
                </div>
                <MovieWatched
                        _id={member._id}
                        movies={movies} />
                </div>
            )
        })}
        </>
        )}
        </>
    )
}