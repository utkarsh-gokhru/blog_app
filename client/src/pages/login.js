import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/auth/login',{username, password})
        .then(response => {
            console.log(response.data);
            setUsername('');
            setPassword('');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <label>Username:</label>
                    <input type="text" value={username} required 
                    placeholder='email or username'
                    onChange={(e) => setUsername(e.target.value)} />

                    <label>Password:</label>
                    <input type="password" value={password} required
                    onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
