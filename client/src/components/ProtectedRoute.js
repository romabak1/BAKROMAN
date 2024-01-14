import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // Показати індикатор завантаження поки перевіряється токен
    return <div>Loading...</div>; // Можна замінити на компонент Loader, якщо він є
  }

  if (!user) {
    // Якщо користувач не авторизований і завантаження завершилось, перенаправити на сторінку логіну
    return <Navigate to="/login" />;
  }

  // Якщо користувач авторизований, відображати діти (children)
  return children;
};

export default ProtectedRoute;
