import React, { useState } from 'react';
import axios from 'axios';

function Otp({email}) {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    axios.post('http://localhost:5000/auth/otp',{handleSignup,email})
    .then(response => {
        console.log(response.data);
        handleSignup;
    })
    .catch(error => {
        console.log(error);
        setOtp('');
    })
  };

  return (
    <div className="App">
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
