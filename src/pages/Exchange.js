import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import cl from './src/Exchange/Exchange.module.css'
import qr from './src/Exchange/qr-code.png'
import { useState } from "react";
import { useEffect } from "react";
import Profile from "../components/Profile/Profile";

const Exchange = () => {
    const [username, setUsername] = useState('');
    const [platform, setPlatform] = useState('');
    const [userData, setUserData] = useState('');

    useEffect(() => {

        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user)  {
                setPlatform(window.Telegram.WebApp.platform)
                setUsername(user.username)
            }
            else {
                setUsername('ELR1C180')
            }
        }
        }, []);

        const fetchUserData = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/user/${chatId}/`);
                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData)
                } else {

                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
        fetchUserData(chatId);

    return(
        platform !== 'tdesktop' && platform !== 'macos' ? (
        <div>
            <Profile username={username} />
            <Card userdata={userData} />
            <Navbar/>
        </div>
        )  : (
            <div className={cl.MobileView}>
            <h1>Available on Mobile only</h1>
           <img src={qr} alt="mobileQr"/>
             </div>
        )
    )
}

export default Exchange;