import { useEffect, useState } from "react"

export default function AuthenticationForm({ handleSubmit, err, btnName }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState('');

    const isInvalid = password === '' || username === '';

    useEffect(() => { if(err) setError(err) },[err]);

    const handleLocalSubmit = (event) => {
        event.preventDefault();
        handleSubmit( username, password );
    };

    return (
        <div className="authentication-f">

        { error && <p role="log" className="error">{error}</p> }

        <form onSubmit={ handleLocalSubmit }>

            <label htmlFor="username">User Name:</label>
            <input
                name="username"
                type="text"
                placeholder="Enter your User Name"
                value={ username }
                onChange={({ target }) => setUsername(target.value)}
                />
            <label htmlFor="password">Password:</label>
            <input
                name="password"
                type="password"
                placeholder="Enter your Password"
                value={ password }
                onChange={({ target }) => setPassword(target.value)}
                />
            <button 
                disabled={ isInvalid }
                type="submit" >{ btnName }</button>
        </form>
        </div>
    )
}