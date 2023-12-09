const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//кнопка детальніше
router.get('/details/:code', async (req, res) => {
  try {
      const code = req.params.code;
      // Пошук товарів з вказаним кодом
      const products = await Product.find({ code: code });

      if (products.length === 0) {
          return res.status(404).send('Деталі товару не знайдено.');
      }

      res.json(products);
  } catch (error) {
      console.error('Помилка при отриманні деталей товару:', error);
      res.status(500).send('Помилка сервера');
  }
});

// Маршрут для отримання згрупованих даних про товари
router.get('/grouped', async (req, res) => {
  try {
    // Агрегація даних для отримання загальної кількості кожного товару
    const groupedProducts = await Product.aggregate([
      {
        $group: {
          _id: "$code", // Групування за кодом товару
          name: { $first: "$name" }, // Взяття назви з першого зустрічаючого документа в групі
          totalQuantity: { $sum: "$quantity" } // Підрахунок загальної кількості
        }
      },
      {
        $project: {
          _id: 0, // Виключення поля _id з виводу
          code: "$_id", // Виведення коду товару
          name: 1, // Виведення назви товару
          totalQuantity: 1 // Виведення загальної кількості
        }
      }
    ]);

    res.json(groupedProducts);
  } catch (error) {
    console.error('Помилка при отриманні згрупованих товарів:', error);
    res.status(500).send('Помилка сервера');
  }
});

// Маршрут для додавання нового продукту
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Отримання всіх товарів
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Оновлення товару
router.put("/:id", async (req, res) => {
  try {
    const { name, code, serialNumber, barcode, manufactureDate, expiryDate, arrivalDate, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, code, serialNumber, barcode, manufactureDate, expiryDate, arrivalDate, quantity },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Видалення товару
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Товар видалений" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;