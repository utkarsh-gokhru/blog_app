import React, { useState } from 'react';
import axios from 'axios';

function Otp({ handleSignup, email, mailOtp, otpVerify, setOtpVerify }) {
  const [otp, setOtp] = useState('');
  const [invalOtp, setInvalOtp] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth/otp', { email, otp, mailOtp })
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
    <div className="App">
      <div>
        {invalOtp && <p>The otp did not match</p>}
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
