import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LogoutButton from './LogOutButton';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav>

      {user ? (<>
        <div className='left-group'>
          <button onClick={() => navigateTo('/')}>Головна</button>
          {user && user.isAdmin && (
            <button onClick={() => navigateTo('/admin')}>Адміністративна Панель</button>
          )}
          <button onClick={() => navigateTo('/products')}>Отримання продуктів</button> {/* Кнопка для переходу на сторінку з продуктами */}
          <button onClick={() => navigateTo('/productslist')}>Продукти</button> {/* Кнопка для переходу на сторінку з продуктами */}
        </div>
        <LogoutButton />

      </>
      )
        :
        (
        <div>
          <button onClick={() => navigateTo('/login')}>Ви не війшли в акаунт</button>
        </div>
        )
      }

    </nav>
  );
}

export default Navbar;

<LogoutButton />