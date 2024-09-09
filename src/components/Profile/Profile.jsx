import React from "react";
import cl from './Profile.module.css'
import profile from './profile.svg'
import card from '../Card/cardgray.svg'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = (user) => {

    const [level, setLevel] = useState('')

    useEffect(() => {
        const fetchUserData = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    const check_level = await fetch(`http://bankclick-bot.ru/level_info/${userData.level}`)
                    const userLevel = check_level.json();
                    setLevel(userLevel)
                } else {
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };
    
        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
        fetchUserData(chatId);
    }, []);

    return (
        <div className={cl.ProfileWrap}>
            <div className={cl.profileSide}>

                <img src={profile} className={cl.profileImg} alt="profile"/>
                
                <div className={cl.details}>
                    <p className={cl.username}>
                        {user.username}
                    </p>
                    <img className={cl.miniCard} src={card}/>
                </div>

                

            </div>
            <Link to="/ld/">
                <div className={cl.levelSide}>
                    <p className={cl.levelLabel}>{level.title}</p>
                    <div className={cl.progressBar}>
                        <div className={cl.progress}></div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Profile;