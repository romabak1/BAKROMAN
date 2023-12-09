const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ userId: decoded.user.id, token });

    if (!session) {
      return res.status(401).send("Неавторизований доступ");
    }

    const user = await User.findById(decoded.user.id);
    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).send("Доступ заборонено");
    }
  } catch (error) {
    res.status(401).send("Неавторизований доступ");
  }
};

module.exports = verifyAdmin;
