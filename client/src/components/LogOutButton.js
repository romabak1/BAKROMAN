import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function LogoutButton() {
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser(); // Використання функції logoutUser для очищення стану користувача

    // Очищення токена з локального сховища
    localStorage.removeItem('token');

    navigate('/login'); // Перенаправлення на сторінку логіну
  };

  return (
    <button onClick={handleLogout}>Вийти</button>
  );
}

export default LogoutButton;
