import React, { useState, useEffect } from "react";
import cl from './src/ld/ld.module.css';
import { useNavigate } from "react-router-dom";
import basic from './src/ld/cardgray 1.svg';
import starter from './src/ld/card green 1 (3).svg';
import advanced from './src/ld/card blue 1.svg';
import premium from './src/ld/red.svg';
import elite from './src/ld/card purple 1.svg';
import clk from '../components/Navbar/logohand.png';

const levels = [
    { name: 'Basic', boxShadow: "0px 61px 199px 12px rgba(100,100,100,0.75) inset", titleColor: '#2E3528', levelCard: basic, barColor: 'linear-gradient(to right, #979797, #4b4848)', scoreColor: '#343532', maxBalance: 500000 },
    { name: 'Starter', boxShadow: '0px 61px 199px 12px rgba(117,173,61,0.41) inset', titleColor: '#2E3528', levelCard: starter, barColor: 'linear-gradient(270deg, rgba(175,221,128,1) 4%, rgba(67,129,53,1) 86%)', scoreColor: '#343532', maxBalance: 1000000 },
    { name: 'Advanced', boxShadow: '0px 61px 199px 12px rgba(20,141,206,0.41) inset', titleColor: '#231A1A', levelCard: advanced, barColor: 'linear-gradient(270deg, rgba(121,196,234,1) 4%, rgba(25,76,122,1) 86%)', scoreColor: '#232526', maxBalance: 2000000 },
    { name: 'Premium', boxShadow: '0px 61px 199px 12px rgba(193,42,34,0.41) inset', titleColor: '#B7B7B7', levelCard: premium, barColor: 'linear-gradient(270deg, rgba(233,132,127,1) 4%, rgba(164,55,49,1) 67%, rgba(146,42,42,1) 86%)', scoreColor: '#232526', maxBalance: 4000000 },
    { name: 'Elite', boxShadow: '0px 61px 199px 12px rgba(176,44,120,0.41) inset', titleColor: '#B7B7B7', levelCard: elite, barColor: 'linear-gradient(270deg, rgba(178,41,121,1) 4%, rgba(60,23,45,1) 86%)', scoreColor: '#232526', maxBalance: 10000000 },
];

const Leaders = () => {
    const [levelProcent, setLevelProcent] = useState('');
    const [balance, setBalance] = useState('');
    const [currentUserLevel, setCurrentUserLevel] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    const checkLevel = await fetch(`https://bankclick-bot.ru/level_info/${userData.level}`);
                    const userLevel = await checkLevel.json();
                    setCurrentUserLevel(userLevel);

                    const maxBalance = userLevel.max_balance;
                    const balance = userData.balance;

                    let percentage = (balance / maxBalance) * 100;
                    percentage = percentage < 1 ? 1 : percentage;

                    setLevelProcent(`${Math.ceil(percentage)}%`);
                    setBalance(balance);
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
        fetchUserData(chatId);

        fetch('https://bankclick-bot.ru/user-ranking/')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handlePrev = () => {
        setCurrentLevelIndex(prevIndex => prevIndex === 0 ? levels.length - 1 : prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentLevelIndex(prevIndex => prevIndex === levels.length - 1 ? 0 : prevIndex + 1);
    };

    const currentLevel = levels[currentLevelIndex];

    return (
        <div
            className="App"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                transition: 'box-shadow 0.5s',
                boxShadow: currentLevel.boxShadow,
                padding: '20px',
            }}
        >
            <div className={cl.levelName}>
                <span className={cl.navigate}>
                    <i className="fa-solid fa-chevron-left" onClick={handlePrev}></i>
                </span>
                <span className={cl.currentName} style={{ color: currentLevel.titleColor }}>{currentLevel.name}</span>
                <span className={cl.navigate}>
                    <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
                </span>
            </div>
            <div className={cl.Card}>
                <img src={currentLevel.levelCard} alt={currentLevel.name} />
            </div>
            {currentUserLevel && currentUserLevel.id === levels[currentLevelIndex].level && (
                <div className={cl.levelBar}>
                    <div style={{
                        width: '90%',
                        height: '5px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <div style={{
                            width: levelProcent,
                            height: '100%',
                            background: currentLevel.barColor,
                            borderRadius: '2px'
                        }}></div>
                    </div>
                    <h3 className={cl.Balance} style={{ color: currentLevel.scoreColor }}>
                        {balance}/{currentLevel.maxBalance.toLocaleString()}
                    </h3>
                </div>
            )}
            <div className={cl.LeaderboardTable} style={{ textAlign: 'center' }}>
                <p style={{ color: '#555951' }}>Leaderboard:</p>
                <div className={cl.DataTable} style={{ border: '1px solid black', borderRadius: '15px', padding: '10px 0' }}>
                    {users.map((user, index) => (
                        <React.Fragment key={user.id}>
                            <div className={cl.UserRow}>
                                <div className={cl.UserInfo}>
                                    <span className={cl.Position}>{index + 1}</span>
                                    <span className={cl.Username}>{user.username}</span>
                                </div>
                                <div className={cl.UserBalance}>
                                    <span className={cl.Balance}>{user.total_per_hour}</span>
                                    <img className={cl.UserImage} src={clk} alt="Icon" />
                                </div>
                            </div>
                            <hr className={cl.Divider} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leaders;
