import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    // Перевірка, чи користувач авторизований через контекст користувача
    if (!user) {
        // Якщо користувач не авторизований, перенаправити на сторінку входу (логін)
        return <Navigate to="/login" />;
    }
    
    // Якщо користувач авторизований, відображати запитаний компонент (дітей)
    return children;
};

export default ProtectedRoute;
