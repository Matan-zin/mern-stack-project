import * as ROUTE from '../constants/routes';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import '../styles/users.css';

import Notfound from '../pages/not-found';
import Button   from '../components/Button';
import AllUsers from '../components/users/AllUsers';
import AddUser  from '../components/users/AddUser';
import EditUser from '../components/users/EditUser';


export default function UsersManegment() {

    const { url, path } = useRouteMatch();

    return (
        <div className="page user-page">
        <div className="head user-head">
        <h1>Users Managment</h1>
        <div className='head-btns-wrapper'>
        <Button name={'All Users'} url={ url } />
        <Button name={'Add User'}  url={ url + ROUTE.ADD_USER } /> 
        </div>
        </div>
        <Switch>
        <Route exact path={ path } render={() => <AllUsers url={ url } /> } />
        <Route path={ path + ROUTE.ADD_USER } render={() => <AddUser  url={ url } /> } /> 
        <Route path={ path + ROUTE.EDIT_USER } render={() => <EditUser url={ url } /> } />
        <Route component={ Notfound } />
        </Switch>
        </div>
    )
}
