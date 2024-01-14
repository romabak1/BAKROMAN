import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Стан для відстеження загрузки

  const setUserFromToken = useCallback(async (token) => {
    setLoading(true); // Початок загрузки
    try {
      const response = await axios.get('http://localhost:5001/api/user/verifyToken', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isValid) {
        setUser(response.data.user);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error('Помилка при перевірці токену', error);
      logoutUser();
    } finally {
      setLoading(false); // Закінчення загрузки
    }
  }, []);

  const loginUser = async (token) => {
    localStorage.setItem('authToken', token);
    setUserFromToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUserFromToken(token);
    } else {
      setLoading(false); // Закінчення загрузки, якщо токена немає
    }
  }, [setUserFromToken]);

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
