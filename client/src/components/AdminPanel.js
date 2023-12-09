import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = () => {
      axios.get("http://localhost:5001/api/admin/users", {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error("Помилка запиту", error);
        });
    };

    fetchUsers();
  }, [authToken]);

  const handleChangeRights = (userId, isAdmin, canEdit) => {
    axios.put(`http://localhost:5001/api/admin/updateRights/${userId}`, { isAdmin, canEdit }, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(response => {
        setUsers(users.map(user => user._id === userId ? response.data : user));
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
