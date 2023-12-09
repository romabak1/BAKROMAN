import { Navigation } from "./components/Navigation";
import HomePage from "./components/HomePage"
import AdminPanel from './components/AdminPanel';
import ProductRegistry from "./components/ProductRegistry";
import Navbar from "./components/Navbar";
import { UserProvider } from './context/UserContext';
import "./App.css"

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsList from "./components/GroupedProductsList";

// У вашому компоненті App або Router


function App() {
  const isAuthenticated = localStorage.getItem("token"); // Перевірка наявності токена

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Перенаправлення з головної сторінки на сторінку логіна, якщо не авторизований */}
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductRegistry />} />
          <Route path="/productslist" element={<ProductsList />} /> {/* Маршрут для ProductsList */}
        </Routes>
        <Navigation />
      </Router>
    </UserProvider>

  );
}

export default App;

