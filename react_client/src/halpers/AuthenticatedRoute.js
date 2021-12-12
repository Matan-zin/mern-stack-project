import React , { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Route, Redirect } from 'react-router';
import { protected_route } from '../services/services';

export default function AuthenticatedRoute({ redirect, children, ...rest }) {
    const [auth, setAuth ] = useState(false);

    const checkAuthenticated = () => {
            protected_route()
            .then(res => setAuth({ success: res.data.success }))
            .catch(() => setAuth({ success: undefined }))
    };
    useEffect(() => checkAuthenticated(), [])
    return (
        <>
        { !auth 
          ? ( <Skeleton count={1} /> 
        ) : ( 
        <Route { ...rest } render={({ location }) => {
                return auth.success 
                            ? React.cloneElement(children) 
                            : <Redirect to={{ pathname: redirect, state: { from: location} }} /> }}/>
         )}
        </>
    )
}