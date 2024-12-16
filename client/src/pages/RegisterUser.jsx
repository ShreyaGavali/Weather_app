import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
          await axios.post('http://localhost:8080/api/user/signup', { username, password });
          alert('Signup successful! Please login.');
          navigate("/login");
        } catch (error) {
          alert(error.response.data.message);
        }
      };
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
        <p>Already have an account ? <Link to="/login">LogIn</Link></p>
    </div>
  )
}

export default RegisterUser