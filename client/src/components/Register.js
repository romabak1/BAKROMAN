import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // Стани для збереження даних введених користувачем
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Стан для відображення помилок
  const navigate = useNavigate();

  // Обробник подання форми реєстрації
  const handleSubmit = async (e) => {
    e.preventDefault(); // Зупинити діяльність за замовчуванням форми
    setError(""); // Очистити попередню помилку
    try {
      const response = await fetch("http://localhost:5001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Відправити дані реєстрації на сервер
      });

      const data = await response.json(); // Розбір відповіді сервера

      if (response.ok) {
        navigate("/login"); // Перенаправлення на сторінку входу після успішної реєстрації
      } else {
        setError(data.msg); // Встановлення повідомлення про помилку з сервера
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
          className="inp"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          id="passwordinput2"
          required
        />
        <input
          className="inp"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          id="email-input2"
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>
      {error && <div className="error">{error}</div>}{" "}
      {/* Відображення помилки, якщо вона є */}
    </div>
  );
}

export default Register;
