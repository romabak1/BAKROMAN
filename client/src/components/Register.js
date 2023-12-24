// client/src/components/Register.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/login"); // Перенаправлення на сторінку логіна після реєстрації
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError("Не вдалося з'єднатися з сервером.");
    }
  };
  return (
    <div className="auth">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id = "passwordinput2"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id = "email-input2"
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Register;
