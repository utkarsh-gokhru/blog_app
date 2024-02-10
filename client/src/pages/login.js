import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://blogapp-qmqx.onrender.com/auth/login',{username, password})
        .then(response => {
            console.log(response.data);
            setUsername('');
            setPassword('');
            localStorage.setItem('username',username);
            navigate('/home');
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
