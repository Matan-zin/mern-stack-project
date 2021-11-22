import { Link } from "react-router-dom";
import { get_data } from "../../services/services";
import Skeleton from "react-loading-skeleton";
import * as ROUTES from '../../constants/routes'
import { useEffect, useState } from "react";

export default function SubsricptionWatched({ _id }) {

    const [members, setMembers] = useState(false);
    const [subscriptions, setSubscriptions] = useState(false);

    useEffect(() => {
        get_data('members'      ).then(res => setMembers(res.data)      ).catch(err => console.error(err.message));
        get_data('subscriptions').then(res => setSubscriptions(res.data)).catch(err => console.error(err.message));
    }, []);


    return (
        <>
        { !(subscriptions && members) ? ( <Skeleton count={2} /> ) : (
        <div className="sub-watch">
        <h4>Subscription Watched:</h4>
        { subscriptions.map(elem => {
            return elem.movies.map((movie, index) => {
                    if(movie.movieId === _id){
                        return <Link key={index}
                                     to={`${ROUTES.SUBSCRIPTIONS}#${elem._id}`}>
                                {members.filter(member => member._id === elem._id)[0]?.['name']}
                               </Link>
                    } else return null;
            }) 
        })
        }
        </div>
        )}
        </>
    )
}