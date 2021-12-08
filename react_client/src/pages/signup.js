import { useState } from "react";
import { signup } from "../services/services";
import { useHistory } from "react-router-dom";
import * as ROUTE from "../constants/routes";
import AuthenticationForm from "../components/AuthenticationForm";

import '../styles/auth.css';
import logo from '../assets/logo.svg';

export default function Signup() {
    
    const history = useHistory();
    const [error, setError] = useState('');

    const handleCreate = async (username, password) => {
      try {
          const res = await signup(username, password);
          if(res) history.push(ROUTE.LOGIN);
      } 
      catch(err) { setError('username are invalid..') }
    }

    return (
        <div className="auth-p">
        <img className="logo-auth" src={logo} alt="logo" />
        <div className="auth-c">
        <h1>Cinema<span>Admin</span></h1>
        <h3>Create an Account</h3>
        <AuthenticationForm
            handleSubmit={ handleCreate }
            err={ error }
            btnName={ "Create" } />
        </div>
        </div>
    )
}