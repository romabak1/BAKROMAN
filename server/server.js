const connectDB = require("./db");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const productRoutes = require("./routes/products");



connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use("/api/user", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
