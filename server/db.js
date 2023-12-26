const mongoose = require("mongoose");

// Функція для встановлення з'єднання з базою даних MongoDB
const connectDB = async () => {
  try {
    // Використовуємо метод mongoose.connect для з'єднання з базою даних
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("MongoDB Connected"); // Виводимо повідомлення про підключення до консолі
  } catch (err) {
    console.error(err.message); // Виводимо помилку до консолі, якщо з'єднання не вдалось
    process.exit(1); // Виходимо з програми з кодом помилки 1
  }
};

module.exports = connectDB;
