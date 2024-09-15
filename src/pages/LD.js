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
    { id: 1, name: 'Basic', boxShadow: "0px 61px 199px 12px rgba(100,100,100,0.75) inset", titleColor: '#2E3528', levelCard: basic, barColor: 'linear-gradient(to right, #979797, #4b4848)', scoreColor: '#343532' },
    { id: 2, name: 'Starter', boxShadow: '0px 61px 199px 12px rgba(117,173,61,0.41) inset', titleColor: '#2E3528', levelCard: starter, barColor: 'linear-gradient(270deg, rgba(175,221,128,1) 4%, rgba(67,129,53,1) 86%)', scoreColor: '#343532' },
    { id: 3, name: 'Advanced', boxShadow: '0px 61px 199px 12px rgba(20,141,206,0.41) inset', titleColor: '#231A1A', levelCard: advanced, barColor: 'linear-gradient(270deg, rgba(121,196,234,1) 4%, rgba(25,76,122,1) 86%)', scoreColor: '#232526' },
    { id: 4, name: 'Premium', boxShadow: '0px 61px 199px 12px rgba(193,42,34,0.41) inset', titleColor: '#B7B7B7', levelCard: premium, barColor: 'linear-gradient(270deg, rgba(233,132,127,1) 4%, rgba(164,55,49,1) 67%, rgba(146,42,42,1) 86%)', scoreColor: '#232526' },
    { id: 5, name: 'Elite', boxShadow: '0px 61px 199px 12px rgba(176,44,120,0.41) inset', titleColor: '#B7B7B7', levelCard: elite, barColor: 'linear-gradient(270deg, rgba(178,41,121,1) 4%, rgba(60,23,45,1) 86%)', scoreColor: '#232526' },
];

const Leaders = () => {
    const [levelProcent, setLevelProcent] = useState('');
    const [balance, setBalance] = useState('');
    const [users, setUsers] = useState([]);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [levelInfo, setLevelInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    const levelResponse = await fetch(`https://bankclick-bot.ru/level_info/${userData.level}`);
                    const userLevel = await levelResponse.json();

                    // Update the levelInfo state
                    setLevelInfo(prev => ({
                        ...prev,
                        [userData.level]: userLevel
                    }));

                    const maxBalance = userLevel.max_balance;
                    const userBalance = userData.balance;

                    // Calculate percentage
                    let percentage = (userBalance / maxBalance) * 100;
                    if (percentage < 1) {
                        percentage = 1;
                    }

                    setLevelProcent(`${Math.ceil(percentage)}%`);
                    setBalance(userData.balance);
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
        fetchUserData(chatId);
    }, []);

    useEffect(() => {
        fetch('https://bankclick-bot.ru/user-ranking/')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handlePrev = () => {
        setCurrentLevelIndex(prevIndex =>
            prevIndex === 0 ? levels.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentLevelIndex(prevIndex =>
            prevIndex === levels.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentLevel = levels[currentLevelIndex];
    const currentLevelInfo = levelInfo[currentLevel.id] || { max_balance: 0 }; // Set default value if undefined

    // Filter users by the current level
    const filteredUsers = users.filter(user => user.level === currentLevel.id);

    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.overflow = 'visible';

        return () => {
            document.body.style.margin = '';
        };
    }, []);

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
                <span className={cl.currentName} style={{ color: currentLevel.titleColor }}>
                    {currentLevel.name}
                </span>
                <span className={cl.navigate}>
                    <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
                </span>
            </div>
            <div className={cl.Card}>
                <img src={currentLevel.levelCard} alt={currentLevel.name} />
            </div>
            {levelInfo[currentLevel.id] && (
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
                        {balance}/{currentLevelInfo.max_balance.toLocaleString()}
                    </h3>
                </div>
            )}
            <div className={cl.LeaderboardTable} style={{ textAlign: 'center' }}>
                <p style={{ color: '#555951' }}>Leaderboard:</p>
                <div className={cl.DataTable} style={{ border: '1px solid black', borderRadius: '15px', padding: '10px 0' }}>
                    {filteredUsers.map((user, index) => (
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
