const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Представлення користувача
const router = express.Router();

// Маршрут для перевірки валідності токена
router.get("/verifyToken", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Отримуємо токен із заголовка запиту
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Розкодовуємо токен за допомогою секретного ключа

    const user = await User.findById(decoded.user.id).select("-password"); // Шукаємо користувача за ідентифікатором з токена
    if (!user) {
      return res.status(404).json({ msg: "Користувач не знайдений" });
    }

    res.json({ isValid: true, user }); // Повертаємо результат перевірки валідності токена та користувача (без паролю)
  } catch (error) {
    res.status(401).json({ isValid: false, msg: "Недійсний токен" }); // Повертаємо статус 401 при недійсному токені
  }
});

// Маршрут реєстрації користувача
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body; // Отримуємо email і пароль із запиту
    let user = await User.findOne({ email: email }); // Перевіряємо, чи існує користувач із вказаним email

    if (user) {
      return res
        .status(400)
        .json({ msg: "Користувач з таким логіном вже існує" });
    }

    // Хешуємо пароль перед збереженням у базі даних
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword }); // Створюємо нового користувача
    await user.save(); // Зберігаємо користувача у базу даних

    // Створюємо JWT-токен для користувача і повертаємо його
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Маршрут входу в систему
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Отримуємо email і пароль із запиту

  try {
    let user = await User.findOne({ email: email }); // Знаходимо користувача за email

    if (!user) {
      return res.status(400).json({ msg: "Неправильний логін або пароль" });
    }

    // Порівнюємо хеш паролю користувача з отриманим паролем
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Неправильний логін або пароль" });
    }

    // Створюємо JWT-токен для авторизованого користувача і повертаємо його
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
