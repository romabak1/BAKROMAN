import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // стан для відслідковування завантаження даних користувача

  
  // Функція для оновлення даних користувача після входу
  const loginUser = async (token) => {
    localStorage.setItem('token', token);
    try {
      const response = await axios.get('http://localhost:5001/api/user/verifyToken', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.isValid) {
        setUser(response.data.user);
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Помилка при перевірці токену", error);
      logoutUser();
    }
  };

  // Функція для виходу користувача
  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      setIsLoading(true); // початок завантаження
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5001/api/user/verifyToken', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.data.isValid) {
            setUser(response.data.user);
          } else {
            logoutUser();
          }
        } catch (error) {
          console.error("Помилка при перевірці токену", error);
          logoutUser();
        }
      }
      setIsLoading(false);
    };
  
    verifyUser();
  }, []);


  if (isLoading) {
    // Можете показати спінер або інший індикатор завантаження
    return <div className='loading'>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
