import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Імпортуємо UserContext для використання контексту користувача

function Login() {
  const [email, setEmail] = useState(""); // Стейт для збереження email користувача
  const [password, setPassword] = useState(""); // Стейт для збереження паролю користувача
  const [error, setError] = useState(""); // Стейт для збереження повідомлень про помилки
  const navigate = useNavigate(); // Хук для навігації між сторінками
  const { loginUser } = useContext(UserContext); // Витягуємо функцію loginUser із контексту користувача

  const handleSubmit = async (e) => {
    e.preventDefault(); // Забороняємо стандартну поведінку форми (перезавантаження сторінки)
    setError(""); // Очищаємо повідомлення про помилки перед відправкою запиту
    try {
      const response = await fetch("http://localhost:5001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Відправляємо email і пароль на сервер у форматі JSON
      });

      const data = await response.json();
      if (response.ok) {
        loginUser(data.token); // Викликаємо функцію loginUser для оновлення стану користувача з отриманим токеном
        navigate("/"); // Перенаправляємо користувача на домашню сторінку
      } else {
        setError(data.msg); // Встановлюємо повідомлення про помилку, якщо авторизація не вдалася
      }
    } catch (error) {
      setError("Не вдалося з'єднатися з сервером."); // Встановлюємо повідомлення про помилку, якщо сталася помилка з'єднання з сервером
    }
  };

  return (
    <div className="auth">
      <h2>Авторизація</h2>
      <form onSubmit={handleSubmit}>
        <input className="inp"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="email-input"
          required
        />
        <input className="inp"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="passwordinput"
          placeholder="Password"
          required
        />
        <button type="submit">Увійти</button>
      </form>
      {error && <div className="error">{error}</div>} {/* Відображаємо повідомлення про помилку, якщо воно є */}
    </div>
  );
}

export default Login;
