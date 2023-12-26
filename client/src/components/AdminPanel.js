import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]); // Створюємо стейт для зберігання користувачів
  const authToken = localStorage.getItem('token'); // Отримуємо токен із локального сховища

  useEffect(() => {
    // Ефект, який виконується при зміні authToken
    const fetchUsers = () => {
      // Функція для отримання користувачів з сервера
      axios.get("http://localhost:5001/api/admin/users", {
        headers: {
          'Authorization': `Bearer ${authToken}` // Встановлюємо токен у заголовках запиту
        }
      })
        .then(response => {
          setUsers(response.data); // Оновлюємо стейт користувачів із отриманими даними
        })
        .catch(error => {
          console.error("Помилка запиту", error);
        });
    };

    fetchUsers(); // Викликаємо функцію для отримання користувачів після завантаження компонента
  }, [authToken]); // Ефект спрацьовуватиме при зміні authToken

  const handleChangeRights = (userId, isAdmin, canEdit) => {
    // Функція для зміни прав користувача
    axios.put(`http://localhost:5001/api/admin/updateRights/${userId}`, { isAdmin, canEdit }, {
      headers: {
        'Authorization': `Bearer ${authToken}` // Встановлюємо токен у заголовках запиту
      }
    })
      .then(response => {
        setUsers(users.map(user => user._id === userId ? response.data : user)); // Оновлюємо стейт користувачів із новими даними
      })
      .catch(error => {
        console.error("Помилка оновлення прав", error);
      });
  };

  return (
    <div>
      <h2>Адміністративна Панель</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Адмін</th>
            <th>Може редагувати</th>
            <th>Адмін</th>
            <th>Редагування реєстру</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Так" : "Ні"}</td>
              <td>{user.canEdit ? "Так" : "Ні"}</td>
              <td>
                <button onClick={() => handleChangeRights(user._id, !user.isAdmin, user.canEdit)}>
                  {user.isAdmin ? "Забрати" : "Надати"}
                </button>
              </td>
              <td>
                <button onClick={() => handleChangeRights(user._id, user.isAdmin, !user.canEdit)}>
                  {user.canEdit ? "Забрати право" : "Надати право"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
