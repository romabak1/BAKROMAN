const express = require("express");
const User = require("../models/User");
const Session = require("../models/Session");
const router = express.Router();

const jwt = require("jsonwebtoken");

// Middleware для перевірки прав адміністратора
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Припустимо, що токен передається у заголовку 'Authorization'
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id);
    if (user && user.isAdmin) {
      next(); // Користувач є адміністратором, продовжуємо обробку запиту
    } else {
      res.status(403).send("Доступ заборонено"); // Користувач не є адміністратором
    }
  } catch (error) {
    res.status(401).send("Неавторизований доступ"); // Проблема з аутентифікацією
  }
};


// Маршрут для отримання списку користувачів
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("Помилка сервера");
  }
});
  
// Оновлення прав користувача
router.put("/updateRights/:userId", verifyAdmin, async (req, res) => {
  try {
    const { isAdmin, canEdit } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin, canEdit },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("Помилка сервера");
  }
});

module.exports = router;
