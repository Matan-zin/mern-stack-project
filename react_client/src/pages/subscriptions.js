import Skeleton from "react-loading-skeleton";
import * as ROUTE from "../constants/routes";
import { useContext } from "react"
import ProtectedRoute from "../halpers/ProtectedRoute";
import PermissionsContext from "../context/permissions"
import { useRouteMatch, Switch, Route } from "react-router-dom";

import '../styles/subscriptions.css';

import Button     from "../components/Button";
import Notfound   from "./not-found";
import AddMember  from "../components/subscriptions/AddMember";
import AllMembers from "../components/subscriptions/AllMembers";
import EditMember from "../components/subscriptions/EditMember";

export default function Subscriptions() {

    const { url, path } = useRouteMatch();
    const permissions = useContext(PermissionsContext);

    const isAllVisible    = permissions?.['View Subscriptions']   === 'true' || permissions.admin;
    const isAddVisible    = permissions?.['Create Subscriptions'] === 'true' || permissions.admin;
    const isEditVisible   = permissions?.['Update Subscriptions'] === 'true' || permissions.admin;
    const isDeleteVisible = permissions?.['Delete Subscriptions'] === 'true' || permissions.admin;
    
    
    return (
        <>
        { !permissions ? ( <Skeleton count={1} /> 
            ) : (
            <div className="sub-page">
            <div className="sub-head">

            <h1>Subscriptions</h1>
            <div className="btns-wrapper">
            { isAllVisible &&
            <Button name={'All Members'} url={ url } /> }
            { isAddVisible &&
            <Button name={'Add Member'} url={ url + ROUTE.ADD_MEMBER } /> }
            </div>
            </div>
            <Switch>
            <ProtectedRoute exact path={path} isAllow={isAllVisible} redirect={ROUTE.DASHBOARD}>
                <AllMembers url={url} isDeleteVisible={isDeleteVisible} />
            </ProtectedRoute>

            <ProtectedRoute path={path + ROUTE.EDIT_MEMBER} isAllow={isEditVisible} redirect={url}>
                <EditMember url={url} />
            </ProtectedRoute>

            <ProtectedRoute path={path + ROUTE.ADD_MEMBER} isAllow={isAddVisible} redirect={url}>
                <AddMember url={url} />
            </ProtectedRoute>

            <Route component={Notfound} />
            </Switch>
            </div>
        )}
        </>
    )
}