import React, { useEffect, useState } from "react";
import cl from './Card.module.css';
import card from './cardgray.svg';
import energy from './energy.svg';
import big_energy from './big_energy.svg';
import tap from './tap.svg';

const Card = () => {
    const [counter, setCounter] = useState(0);
    const [userName, setUserName] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [clickPositions, setClickPositions] = useState([]);
    const [energyCount, setEnergy] = useState(1000);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;

    // Получаем данные пользователя при первом рендере
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.username);
                    setClickCount(userData.balance);
                    setEnergy(userData.energy);
                } else {
                    console.error('Ошибка при получении данных пользователя.');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        fetchUserData();
    }, [chatId]);

    // Обработчик клика по карте
    const handleClick = async (event) => {
        if (energyCount <= 0) {
            setError('Недостаточно энергии');
            return;
        }

        // Обратная связь при клике
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');

        setClickCount(prevClickCount => prevClickCount + 1);
        setEnergy(prevEnergyCount => prevEnergyCount - 1);
        setIsClicked(true);
        setCounter(prevCounter => prevCounter + 1);

        // Позиции кликов для визуализации
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY - boundingRect.top;

        setClickPositions(prevClickPositions => [
            ...prevClickPositions,
            { x: offsetX, y: offsetY, id: counter }
        ]);

        // Обновление данных на сервере
        try {
            const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    balance: clickCount + 1,
                    energy: energyCount - 1,
                }),
            });

            if (!response.ok) {
                setError('Ошибка при обновлении данных пользователя.');
            }
        } catch (error) {
            setError('Ошибка при обновлении данных пользователя.');
            console.error('Ошибка при обновлении данных пользователя:', error);
        }

        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    // Открытие модального окна
    const handleEnergyClick = () => {
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Форматирование номера
    const formatNumber = (num) => {
        if (num === undefined || num === null || isNaN(num)) {
            return `0000 0000 0000 0000`;
        }

        const paddedNumber = num.toString().padStart(16, '0');
        return paddedNumber.match(/.{1,4}/g).join(' ');
    };

    return (
        <div>
            <div className={cl.cardBlock}>
                <img
                    src={card}
                    alt="card"
                    onTouchStart={handleClick}
                    className={`${cl.card} ${isClicked ? cl.cardClicked : ''}`}
                />
                <div className={cl.cardInfo}>
                    <span className={cl.cardNumber}>{formatNumber(clickCount)}</span>
                    <br />
                    <br />
                    <span className={cl.cardOwner}>{userName}</span>
                </div>
            </div>
            <div className={cl.energy} onClick={handleEnergyClick}>
                <img src={energy} alt="energy" />
                <p>{energyCount}</p>
            </div>
            {error && <p className={cl.error}>{error}</p>}

            {isModalOpen && (
                <div className={cl.modalOverlay} onClick={closeModal}>
                    <div className={cl.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={big_energy} alt="lightning" className={cl.modalIcon} />
                        <div className={cl.modalButtons}>
                            <button className={cl.boostButton}>Boost</button>
                            <button className={cl.boostButton}>Full Energy</button>
                        </div>
                        <div className={cl.modalOptions}>
                            <div className={cl.optionItem}>
                                <img src={tap} alt="Multitap" className={cl.optionIcon} />
                                <span>Multitap · 1lvl · 2 000</span>
                            </div>
                            <div className={cl.optionItem}>
                                <img src={energy} alt="Energy" className={cl.optionIcon} />
                                <span>Energy · 1lvl · 3 000</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
