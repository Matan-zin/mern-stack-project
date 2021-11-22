import React from 'react';
import { Route, Redirect } from 'react-router';

export default function ProtectedRoute({ isAllow, redirect, children, ...rest }) {
    return (
        <Route {...rest} render={({ location }) => {
                return isAllow
                        ? React.cloneElement(children)
                        : <Redirect to={{ pathname: redirect, state: { from: location} }} />
            }}/>
    )
}