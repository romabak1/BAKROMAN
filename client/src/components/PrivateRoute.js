// PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Змінено шлях імпорту
import { useContext } from 'react';


const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
