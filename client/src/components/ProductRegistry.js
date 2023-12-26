import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/ProductRegistry.css";

const ProductRegistry = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // Стан для відстеження видимості модального вікна
  const [isEditing, setIsEditing] = useState(false); // Стан для відстеження режиму редагування товару
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    code: "",
    serialNumber: "",
    barcode: "",
    manufactureDate: "",
    expiryDate: "",
    arrivalDate: new Date().toISOString().split("T")[0], // За замовчуванням - сьогоднішня дата
    quantity: products ? products.quantity : 0, // За замовчуванням - 0
  });

  // Функція для форматування дати для відображення
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Завантаження списку товарів під час завантаження компоненту
  useEffect(() => {
    fetchProducts();
  }, []);

  // Запит на сервер для отримання списку товарів
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Помилка завантаження: " + response.statusText);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Помилка при завантаженні товарів:", error);
      // Тут можна встановити стан для відображення помилки користувачу
    }
  };

  // Додавання або редагування інформації про продукт
  const handleAddOrEditProduct = async () => {
    const endpoint = isEditing
      ? `http://localhost:5001/api/products/${currentProduct._id}`
      : "http://localhost:5001/api/products";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(currentProduct),
      });

      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      if (isEditing) {
        setProducts(
          products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
      } else {
        setProducts([...products, updatedProduct]);
      }

      closeModal();
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  // Видалення товару за його ідентифікатором
  const handleDelete = async (productId) => {
    if (!productId) {
      console.error("ID продукту не визначено.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }

      // Оновлення стану для відображення змін
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Помилка при видаленні продукта:", error);
    }
  };

  // Відкриття модального вікна для додавання нового товару
  const openModalToAdd = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: "",
      code: "",
      serialNumber: "",
      barcode: "",
      manufactureDate: "",
      expiryDate: "",
      arrivalDate: new Date().toISOString().split("T")[0],
      quantity: 0,
    });
    setShowModal(true);
  };

  // Відкриття модального вікна для редагування існуючого товару
  const openModalToEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      ...product,
      manufactureDate: product.manufactureDate
        ? new Date(product.manufactureDate).toISOString().split("T")[0]
        : "",
      expiryDate: product.expiryDate
        ? new Date(product.expiryDate).toISOString().split("T")[0]
        : "",
      arrivalDate: product.arrivalDate
        ? new Date(product.arrivalDate).toISOString().split("T")[0]
        : "",
      quantity: product.quantity || 0,
    });
    setShowModal(true);
  };

  // Закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  return (
    <div className="bigtable">
      <h2 className="h21">Реєстр отриманих товарів</h2>
      {user && user.canEdit && (
        <button onClick={openModalToAdd} className="addgoods">
          Додати товар
        </button>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>{isEditing ? "Редагувати товар" : "Новий товар"}</h4>
            <input
              type="text"
              placeholder="Назва товару"
              value={currentProduct.name}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Код товару"
              value={currentProduct.code}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, code: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Номер серії"
              value={currentProduct.serialNumber}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  serialNumber: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Штрихкод"
              value={currentProduct.barcode}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  barcode: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={currentProduct.manufactureDate}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  manufactureDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={currentProduct.expiryDate}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  expiryDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={currentProduct.arrivalDate}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  arrivalDate: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Кількість"
              value={currentProduct.quantity}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  quantity: e.target.value,
                })
              }
            />
            <button className="edit" onClick={handleAddOrEditProduct}>
              {isEditing ? "Зберегти зміни" : "Додати товар"}
            </button>
            <button onClick={closeModal} className="edit">
              Скасувати
            </button>
          </div>
        </div>
      )}

      <table className="table" key="table1">
        <thead>
          <tr>
            <th>Назва товара</th>
            <th>Код товара</th>
            <th>Номер серії</th>
            <th>Штрихкод</th>
            <th>Дата виготовлення</th>
            <th>Дата придатності</th>
            <th>Дата надходження</th>
            <th>Кількість</th>
            {user && user.canEdit && <th>Дії</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.code}</td>
              <td>{product.serialNumber}</td>
              <td>{product.barcode}</td>
              <td>{formatDate(product.manufactureDate)}</td>
              <td>{formatDate(product.expiryDate)}</td>
              <td>{formatDate(product.arrivalDate)}</td>
              <td>{product.quantity}</td>
              {user && user.canEdit && (
                <td>
                  <button
                    className="edit"
                    onClick={() => openModalToEdit(product)}
                  >
                    Редагувати
                  </button>
                  <button
                    className="edit"
                    onClick={() => handleDelete(product._id)}
                  >
                    Видалити
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRegistry;