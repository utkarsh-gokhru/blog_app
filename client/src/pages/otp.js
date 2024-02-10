import React, { useState } from 'react';
import axios from 'axios';

function Otp({ handleSignup, email, mailOtp, otpVerify, setOtpVerify, invalMail }) {
  const [otp, setOtp] = useState('');
  const [invalOtp, setInvalOtp] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    axios.post('https://blogapp-qmqx.onrender.com/auth/otp', { email, otp, mailOtp})
      .then(response => {
        console.log(response.data);
        handleSignup();
        setOtpVerify(false);
      })
      .catch(error => {
        console.log(error);
        setOtp('');
        if(error.response && error.response.status===409){
          setInvalOtp(true);
        }
      })
  };

  return (
    <div className="Otp">
      <div>
        {invalOtp && <p className='error-message'>The otp did not match</p>}
        {invalMail && <p>Could not find the email</p>}
      </div>
      <h1>OTP Verification</h1>
      <div>
        <label>Enter OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}

export default Otp;
