import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        await loginUser(data.token); // Використання await для забезпечення оновлення стану перед переходом
        navigate("/"); // Перенаправлення на головну сторінку
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError("Не вдалося з'єднатися з сервером.");
    }
  };
  

  return (
    
    <div>
      <h2>Авторизація</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="email-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="passwordinput"
          placeholder="Password"
          required
        />
        <button type="submit">Увійти</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
