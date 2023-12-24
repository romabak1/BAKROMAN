import React, { useState, useEffect } from 'react';
import FormatDate from './FormatDate';

const GroupedProductsList = () => {
    const [groupedProducts, setGroupedProducts] = useState([]);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відстеження відкриття модального вікна

    useEffect(() => {
        fetch('http://localhost:5001/api/products/grouped')
            .then(response => response.json())
            .then(data => setGroupedProducts(data))
            .catch(error => console.error('Error fetching grouped products:', error));
    }, []);
    // МААДАЛЬНЕ ВІКНО
    
    const showProductDetails = async (code) => {
        try {
            const response = await fetch(`http://localhost:5001/api/products/details/${code}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedProductDetails(data);
                setIsModalOpen(true);           // Відкрити модальне вікно
            } else {
                throw new Error('Product details not found');
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            setSelectedProductDetails(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрити модальне вікно
    };
    // МААДАЛЬНЕ ВІКНО

    return (
        <div>
            <h2>Всі Товари</h2>
            <table>
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Код</th>
                        <th>Загальна Кількість</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedProducts.map((product) => (
                        <tr key={product.code}>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.totalQuantity}</td>
                            <td>
                                <button onClick={() => showProductDetails(product.code)}>
                                    Переглянути Деталі
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedProductDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={closeModal}>&times;</span>
                        <h3>Деталі товару {selectedProductDetails[0].name}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Код</th>
                                    <th>Серійний Номер</th>
                                    <th>Штрихкод</th>
                                    <th>Дата Виготовлення</th>
                                    <th>Дата Придатності</th>
                                    <th>Дата Надходження</th>
                                    <th>Кількість</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProductDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.code}</td>
                                        <td>{detail.serialNumber}</td>
                                        <td>{detail.barcode}</td>
                                        <td>{FormatDate(detail.manufactureDate)}</td>
                                        <td>{FormatDate(detail.expiryDate)}</td>
                                        <td>{FormatDate(detail.arrivalDate)}</td>
                                        <td>{detail.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupedProductsList;

