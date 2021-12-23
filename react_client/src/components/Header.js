import { useContext } from "react";
import { logout } from "../services/services";
import * as ROUTES from '../constants/routes';
import { Link, useHistory } from "react-router-dom";
import PermissionsContext from "../context/permissions";

import '../styles/header.css';
import Exit from '../assets/Exit.js';

export default function Header({ username }) {
    
    const history = useHistory();
    const permissions = useContext(PermissionsContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push(ROUTES.LOGIN);
    };

    return (
    <header>
    <Link to={ROUTES.DASHBOARD}>
        <span className="logo">CINEMA<span>ADMIN</span></span>
    </Link>
    <span className="user-name">{username}</span>
    { /** input used for css manipulation */}
    <input type="checkbox" className="menu-icon" name="menu-icon" />

    <nav>
    <Link to={ROUTES.MOVIES} aria-label="movies page">Movies</Link>
    <Link to={ROUTES.SUBSCRIPTIONS} aria-label="subscriptions page">Subscriptions</Link>
    { permissions?.['admin'] &&
    <Link to={ROUTES.USERS_MANGMENT} aria-label="users page">Users Managment</Link> }
    <button onClick={ handleLogout } aria-label="log out"> <Exit /> </button>
    </nav>
    
    <label htmlFor="menu-icon" className="menu-icon" role="button" aria-label='manu icon'/>
    </header>
    )
}