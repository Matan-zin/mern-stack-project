import { useState } from "react";
import { signup } from "../services/services";
import { useHistory } from "react-router-dom";
import * as ROUTE from "../constants/routes";
import AuthenticationForm from "../components/AuthenticationForm";

import '../styles/auth.css';
import logo from '../assets/Cameralogo.png';
import Title from "../assets/Title";

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
        <div className="page auth-p">
        <img className="logo-auth" src={logo} alt="camera" />
        <div className="auth-c">
        <Title />
        <h3>Create an Account</h3>
        <AuthenticationForm
            handleSubmit={ handleCreate }
            err={ error }
            btnName={ "Create" } />
        </div>
        </div>
    )
}