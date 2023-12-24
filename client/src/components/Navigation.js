import { useLocation, useNavigate } from 'react-router-dom'
export function Navigation() {
    let location = useLocation();
    let navigate = useNavigate();

    const navigateToLogin = () => navigate("/login");
    const navigateToRegister = () => navigate("/register");

    if (location.pathname === '/register') {
        return (
            <button onClick={navigateToLogin}>Вже зареєстрований?</button>
        );

    } else if (location.pathname === '/login') {
        return (
            <button onClick={navigateToRegister}>Ще не зареєстрований?</button>
        );

    } else {
        return null; // або відображення кнопок для інших маршрутів
    }
};
export default Navigation