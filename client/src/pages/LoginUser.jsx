import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/user/login', { username, password });
          const { token } = response.data;
            localStorage.setItem('token', token);
          alert('Login successful!');
          navigate("/search");
        } catch (error) {
          alert(error.response.data.message);
        }
      };
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "5px"}}>
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginUser