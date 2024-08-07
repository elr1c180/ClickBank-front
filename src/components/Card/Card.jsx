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

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setUserName(user.username);
            } else{setUserName('ELR1C180')}
        }
    }, []);

    // const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 123; // Замените на реальное значение или оставьте 123 как заглушку

    const handleClick = async (event) => {
        if (energyCount <= 0) {
            setError('Недостаточно энергии');
            return;
        }

        setClickCount(clickCount + 1);
        setEnergy(energyCount - 1);
        setIsClicked(true);

        setCounter(counter + 1);

        const boundingRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY - boundingRect.top;

        setClickPositions([...clickPositions, { x: offsetX, y: offsetY, id: counter }]);

        // Обновляем данные пользователя на сервере

        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    const formatNumber = (num) => {
        return `0000 0000 0000 ${num.toString().padStart(4, '0')}`;
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
