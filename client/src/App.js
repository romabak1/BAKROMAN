import { Navigation } from "./components/Navigation";
import HomePage from "./components/HomePage";
import AdminPanel from './components/AdminPanel';
import ProductRegistry from "./components/ProductRegistry";
import Navbar from "./components/Navbar";
import { UserProvider } from './context/UserContext';
import { useContext } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsList from "./components/GroupedProductsList";
import PrivateRoute from "./components/PrivateRoute";
import ResumePage from "./components/ResumePage";
import "./App.css"

import { UserContext } from "./context/UserContext";

function App() {
  const user = useContext(UserContext)
  return ( 
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ResumePage />} />
          {/* Якщо користувач авторизований, перенаправляємо його на головну сторінку, інакше показуємо сторінку логіна */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          {/* Використання PrivateRoute для захисту маршрутів, доступних тільки авторизованим користувачам */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><ProductRegistry /></PrivateRoute>} />
          <Route path="/productslist" element={<PrivateRoute><ProductsList /></PrivateRoute>} />
        </Routes>
        <Navigation />
      </Router>
    </UserProvider>
  );
}

export default App;
