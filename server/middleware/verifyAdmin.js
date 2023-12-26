const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

const verifyAdmin = async (req, res, next) => {
  try {
    // Отримуємо токен із заголовка запиту
    const token = req.headers.authorization.split(" ")[1];

    // Розкодовуємо токен за допомогою секретного ключа
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Перевіряємо, чи існує сесія з данним токеном і користувачем
    const session = await Session.findOne({ userId: decoded.user.id, token });

    if (!session) {
      // Якщо сесія не знайдена, повертаємо статус 401 (Неавторизовано)
      return res.status(401).send("Неавторизований доступ");
    }

    // Знаходимо користувача за його ідентифікатором
    const user = await User.findById(decoded.user.id);

    if (user && user.isAdmin) {
      // Якщо користувач існує та він є адміністратором, додаємо його до об'єкта запиту
      req.user = user;
      next();
    } else {
      // Якщо користувач не є адміністратором, повертаємо статус 403 (Заборонено)
      res.status(403).send("Доступ заборонено");
    }
  } catch (error) {
    // Обробляємо помилку або недійсний токен
    res.status(401).send("Неавторизований доступ");
  }
};

module.exports = verifyAdmin;
