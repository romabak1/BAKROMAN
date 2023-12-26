import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Імпортуємо UserContext для використання контексту користувача

function LogoutButton() {
  const navigate = useNavigate(); // Хук для навігації між сторінками
  const { logoutUser } = useContext(UserContext); // Витягуємо функцію logoutUser із контексту користувача

  const handleLogout = () => {
    logoutUser(); // Використовуємо функцію logoutUser для очищення стану користувача

    // Очищення токена з локального сховища, якщо він зберігається там
    localStorage.removeItem('token');

    navigate('/login'); // Перенаправляємо користувача на сторінку авторизації (логіну)
  };

  return (
    <button className="logout" onClick={handleLogout}>Вийти</button> // Кнопка для виходу, яка викликає функцію handleLogout при кліку
  );
}

export default LogoutButton;
