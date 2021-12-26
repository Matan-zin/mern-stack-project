import { useContext } from "react";
import { logout } from "../services/services";
import * as ROUTES from '../constants/routes';
import { Link, useHistory, useLocation } from "react-router-dom";
import PermissionsContext from "../context/permissions";

import '../styles/header.css';
import Exit from '../assets/Exit.js';

export default function Header() {
    
    const history = useHistory();
    const { pathname } = useLocation();
    // extract current tab position   
    const location = '/' + pathname.split('/')[1]; 
    const permissions = useContext(PermissionsContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        history.push(ROUTES.LOGIN);
    };

    const currentTab = {
        backgroundColor: 'rgb(81,81,81)',
    }

    return (
    <header>
    <Link to={ROUTES.DASHBOARD}>
        <span className="logo">CINEMA<span>ADMIN</span></span>
    </Link>
    { /** input used here for css manipulation */}
    <input type="checkbox" className="menu-icon" name="menu-icon" />
    <nav>
    <Link 
        to={ROUTES.DASHBOARD}
        style={location === ROUTES.DASHBOARD ? currentTab : undefined}
        aria-label="home page">Home</Link>
    <Link
        to={ROUTES.MOVIES}
        style={location === ROUTES.MOVIES ? currentTab : undefined}
        aria-label="movies page">Movies</Link>
    <Link
        to={ROUTES.SUBSCRIPTIONS}
        style={location === ROUTES.SUBSCRIPTIONS ? currentTab : undefined}
        aria-label="subscriptions page">Subscriptions</Link>
    { permissions?.['admin'] &&
    <Link
        to={ROUTES.USERS_MANGMENT} 
        style={location === ROUTES.USERS_MANGMENT ? currentTab : undefined}
        aria-label="users page">Users Managment</Link> 
    }
    <button onClick={ handleLogout } aria-label="log out"> <Exit /> </button>
    </nav>
    <label htmlFor="menu-icon" className="menu-icon" role="button" aria-label='manu icon'/>
    </header>
    )
}