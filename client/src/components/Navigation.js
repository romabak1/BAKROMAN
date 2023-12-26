import { useLocation, useNavigate } from 'react-router-dom'

export function Navigation() {
    let location = useLocation(); // Хук для отримання поточного шляху (URL)
    let navigate = useNavigate(); // Хук для навігації між сторінками

    const navigateToLogin = () => navigate("/login"); // Функція для переходу на сторінку входу
    const navigateToRegister = () => navigate("/register"); // Функція для переходу на сторінку реєстрації

    if (location.pathname === '/register') { // Якщо поточний шлях - /register
        return (
            <button onClick={navigateToLogin}>Вже зареєстрований?</button> // Відображення кнопки для переходу на сторінку входу
        );
    } else if (location.pathname === '/login') { // Якщо поточний шлях - /login
        return (
            <button onClick={navigateToRegister}>Ще не зареєстрований?</button> // Відображення кнопки для переходу на сторінку реєстрації
        );
    } else {
        return null; // Якщо поточний шлях не /register або /login, повертаємо null (не відображаємо кнопки)
    }
};
