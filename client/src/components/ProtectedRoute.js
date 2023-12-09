import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
    // Якщо авторизований, відображати запитаний компонент
};

export default ProtectedRoute;
