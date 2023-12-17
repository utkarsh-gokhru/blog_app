import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/signup.css';
import Otp from './otp';

const SignupPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [otpVerify, setOtpVerify] = useState(false);
    const [mailOtp, setMailOtp] = useState('');
    const navigate = useNavigate();

    const signClick = () => {
        setOtpVerify(true);
        axios.post('http://localhost:5000/auth/sendOtp',{email})
        .then(response => {
            if (response.data && response.data.otp) {
                setMailOtp(response.data.otp);
            } else {
                console.error("Invalid response format");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleSignup = () => {

        if(!username || !email || !password){
            console.log('Enter the credentials');
        }
        else{
            const credentials = {username,email,password};
            axios.post('http://localhost:5000/auth/signup',credentials)
            .then(response => {
                console.log(response.data);
                setUsername('');
                setPassword('');
                setEmail('');
                setIsSignedIn(true);
                navigate('/login');
            })
            .catch(error => {
                console.log("Error posting the data: ",error);

                if(error.response && error.response.status===409){
                    setUserExists(true);
                    setEmailExists(false);
                }
                if(error.response && error.response.status===404){
                    setEmailExists(true);
                    setUserExists(false);
                }
            })
        }
    }

    return (
        <div className="signup-page">
            {
                !otpVerify && 
                <div className="signup-container">

                    <div className='msg'>
                        {isSignedIn && <p className="success-message">SignUp Successful!</p>}
                        {userExists && <p className="error-message">Username already in use</p>}
                        {emailExists && <p className="error-message">Account already exists with the above email id</p>}
                    </div>
                    <h2>Create an Account</h2>
                    <form>
                        <label>Username:</label>
                        <input type="text" 
                        value={username}  
                        onChange={(e) => setUsername(e.target.value)} 
                        required />

                        <label>Email:</label>
                        <input type="email" 
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                        <label>Password:</label>
                        <input type="password"
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                        <button type="button" onClick={signClick}>Sign Up</button>
                    </form>
                    <a href='/login'>Already have an account?</a>
                </div>
            }
            {
                otpVerify && 
                <Otp handleSignup={handleSignup} email={email} mailOtp={mailOtp} otpVerify={otpVerify} setOtpVerify={setOtpVerify}/>
            }
        </div>
    );
};

export default SignupPage;
