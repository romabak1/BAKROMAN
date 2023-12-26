import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext); // Отримуємо дані користувача з контексту користувача

    return user ? children : <Navigate to="/login" />; // Якщо користувач авторизований, відображається вміст, переданий через children, інакше перенаправляємо на сторінку входу
};

export default PrivateRoute;
