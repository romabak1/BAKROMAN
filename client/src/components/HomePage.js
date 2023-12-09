import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext" // Переконайтеся, що шлях до UserContext правильний

const HomePage = ({ children }) => {
    const { user } = useContext(UserContext); // Використання контексту для отримання інформації про користувача

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children     
};

export default HomePage;
