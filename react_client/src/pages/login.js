import { useState } from "react"
import { login } from "../services/services";
import * as ROUTE from '../constants/routes';
import { Link, useHistory } from "react-router-dom";
import AuthenticationForm from "../components/AuthenticationForm";

import '../styles/auth.css'
import logo from '../assets/logo.svg';

export default function Login() {

    const history = useHistory();
    const [error, setError] = useState('');

    const handleLogin = async (username, password) => {
        try {
            // const res = await login(username, password);
            // 
            // if(res.data.success.check) { 
                // localStorage.setItem('id', res.data.success.id);
                // localStorage.setItem('username', res.data.success.username);
                history.push(ROUTE.DASHBOARD);
            //}
        }
        catch(error) { setError(error.toString()) }
    };

    return (
        <div className="auth-p">
        <img className="logo-auth" src={logo} alt="logo" />
        <div className="auth-c">
        <h1>Cinema<span>Admin</span></h1>
        <h3>Login</h3>
        <AuthenticationForm 
            handleSubmit={ handleLogin }
            err={ error }
            btnName={ 'Login' } />
        <span className="new-user">
            New User?{` `}<Link to={ROUTE.SIGN_UP}>Create an Account</Link>
        </span>
        </div>
        </div>
    )
}