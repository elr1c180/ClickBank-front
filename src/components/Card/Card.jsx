import React, { useEffect, useState } from "react";
import cl from './Card.module.css';
import card from './cardgray.svg';
import energy from './energy.svg';

const Card = () => {
    const [counter, setCounter] = useState(0);
    const [userName, setUserName] = useState('');
    const [clickCount, setClickCount] = useState(0);
    const [clickPositions, setClickPositions] = useState([]);
    const [energyCount, setEnergy] = useState(1000);
    const [isClicked, setIsClicked] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.username);
                    setEnergy(userData.energy);
                    setClickCount(userData.balance);
                } else {
                    setError('Не удалось получить данные пользователя.');
                    setUserName('ELR1C180'); // Пользователь не найден
                }
            } catch (error) {
                setError('Ошибка при получении данных пользователя.');
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 7193085118;
        fetchUserData(chatId);
    }, []);

    const handleClick = async (event) => {
        if (energyCount <= 0) {
            setError('Недостаточно энергии');
            return;
        }

        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');

        setClickCount(prevClickCount => prevClickCount + 1);
        setEnergy(prevEnergyCount => prevEnergyCount - 1);
        setIsClicked(true);

        setCounter(prevCounter => prevCounter + 1);

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY - boundingRect.top;

        setClickPositions(prevClickPositions => [
            ...prevClickPositions,
            { x: offsetX, y: offsetY, id: counter }
        ]);

        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 7193085118;
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
                {/* Отображаем позиции кликов, если нужно */}
                {/* {clickPositions.map((pos) => (
                    <div
                        key={pos.id}
                        className={cl.clickCounter}
                        style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
                    >
                        +1
                    </div>
                ))} */}
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
            <div className={cl.energy}>
                <img src={energy} alt="energy" />
                <p>{energyCount}</p>
            </div>
            {error && <p className={cl.error}>{error}</p>}
        </div>
    );
};

export default Card;
