const connectDB = require("./db");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const productRoutes = require("./routes/products");



connectDB(); // Викликаємо функцію connectDB для встановлення з'єднання з базою даних
const app = express(); // Створюємо екземпляр додатку Express
app.use(cors()); // Додаємо CORS middleware для обробки CORS запитів
app.use(express.json()); // Використовуємо middleware для розпізнавання JSON об'єктів у запитах
app.use('/api/admin', adminRoutes); // Додаємо маршрутизацію для адмінської панелі
app.use("/api/user", authRoutes); // Додаємо маршрутизацію для аутентифікації
app.use("/api/products", productRoutes); // Додаємо маршрутизацію для продуктів

const PORT = process.env.PORT; // Отримуємо порт, на якому буде працювати сервер

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
