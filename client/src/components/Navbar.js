import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Імпортуємо UserContext для використання контексту користувача
import LogoutButton from './LogoutButton'; // Імпортуємо компонент LogoutButton

function Navbar() {
  const navigate = useNavigate(); // Хук для навігації між сторінками
  const { user } = useContext(UserContext); // Отримуємо користувача з контексту користувача

  const navigateTo = (path) => {
    navigate(path); // Функція для навігації на різні сторінки
  };

  return (
    <nav>
      {user ? ( // Умовна конструкція: якщо користувач авторизований
        <>
          <div className='left-group'>
            <button onClick={() => navigateTo('/')}>Головна</button>
            {user && user.isAdmin && (
              <button onClick={() => navigateTo('/admin')}>Адміністративна Панель</button>
            )}
            <button onClick={() => navigateTo('/products')}>Отримання продуктів</button> {/* Кнопка для переходу на сторінку з продуктами */}
            <button onClick={() => navigateTo('/productslist')}>Продукти</button> {/* Кнопка для переходу на сторінку з продуктами */}
          </div>
          <LogoutButton /> {/* Виводимо компонент LogoutButton для виходу з системи */}
        </>
      ) : (
        <button onClick={() => navigateTo('/login')}>Ви не війшли в акаунт</button> // Кнопка для переходу на сторінку входу, якщо користувач не авторизований
      )}
    </nav>
  );
}

export default Navbar;
