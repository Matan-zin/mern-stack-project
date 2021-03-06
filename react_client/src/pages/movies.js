import Skeleton from "react-loading-skeleton";
import * as ROUTE from "../constants/routes";
import { useContext } from "react"
import ProtectedRoute from "../halpers/ProtectedRoute";
import PermissionsContext from "../context/permissions";
import { useRouteMatch, Switch, Route } from "react-router";

import '../styles/movies.css';

import Button    from "../components/Button";
import Notfound  from "./not-found";
import AddMovie  from '../components/movies/AddMovie';
import AllMovies from '../components/movies/AllMovies';
import EditMovie from '../components/movies/EditMovie';

export default function Movies() {

    const { url, path } = useRouteMatch();
    const permissions = useContext(PermissionsContext);

    const isAllVisible    = permissions?.['View Movies']   === 'true' || permissions.admin;
    const isAddVisible    = permissions?.['Create Movies'] === 'true' || permissions.admin;
    const isEditVisible   = permissions?.['Update Movies'] === 'true' || permissions.admin;
    const isDeleteVisible = permissions?.['Delete Movies'] === 'true' || permissions.admin;

    return (
        <>
        { !Boolean(permissions) ? ( <Skeleton count={2} /> 
          ) : (
          <div className="page movies-page">
          <div className="head movies-head">
          <h1>Movies</h1>
          <div className="head-btns-wrapper">
          { isAllVisible &&
          <Button name={'All Movies'} url={ url } /> }
          { isAddVisible && 
          <Button name={'Add Movie'} url={url + ROUTE.ADD_MOVIE} /> }
          </div></div>
          <Switch>
          <ProtectedRoute exact path={path} isAllow={isAllVisible} redirect={ROUTE.DASHBOARD}>
              <AllMovies url={url} isDeleteVisible={isDeleteVisible} />
          </ProtectedRoute>

          <ProtectedRoute path={path + ROUTE.ADD_MOVIE} isAllow={isAddVisible} redirect={path}>
               <AddMovie url={url} />
          </ProtectedRoute>

          <ProtectedRoute path={path + ROUTE.EDIT_MOVIE} isAllow={isEditVisible} redirect={path}>
              <EditMovie url={url} />
          </ProtectedRoute>

          <Route component={Notfound} />
          </Switch>
          </div>
        )}
        </>
    )
}