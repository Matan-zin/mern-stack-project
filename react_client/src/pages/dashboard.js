import '../styles/dashboard.css';
import { useEffect, useState } from "react"
import { get_data } from "../services/services"
import { Route, Switch } from "react-router-dom"
import * as ROUTES from '../constants/routes'
import Header from '../components/Header'
import ProtectedRoute from "../halpers/ProtectedRoute"
import PermissionsContext from "../context/permissions"

import Movies         from './movies';
import Welcome        from "./welcome";
import Notfound       from "./not-found";
import Subscriptions  from './subscriptions';
import UsersManagment from './users-managment';

export default function Dashboard() {

    const [permissions, setPermissions] = useState(false);

    const id       = localStorage.getItem('id');
    const username = localStorage.getItem('username');

    useEffect(() => {
        (async () => {
           try { const res =  await get_data('permissions', id);
                 setPermissions(res.data); }
           catch(err) { console.error(err.message) }
        })();
    // eslint-disable-next-line
    },[]);

    return (
        <div className="dashboard">
        <PermissionsContext.Provider value={ { ...permissions } }>
        <Header username={ username }/>
        <Switch>
        <Route exact path="/" render={ () => <Welcome username={ username }/> } />
        <Route path={ROUTES.MOVIES} component={ Movies } />
        <Route path={ROUTES.SUBSCRIPTIONS} component={ Subscriptions } />
        <ProtectedRoute path={ROUTES.USERS_MANGMENT} isAllow={permissions.admin} redirect={ROUTES.DASHBOARD}>
            <UsersManagment />
        </ProtectedRoute>
        <Route component={ Notfound } /> 
        </Switch>
        </PermissionsContext.Provider>
        </div>
    )
}