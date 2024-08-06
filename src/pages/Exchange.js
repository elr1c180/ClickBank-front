import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import cl from './src/Exchange/Exchange.module.css'
import qr from './src/Exchange/qr-code.png'
import { useState } from "react";
import { useEffect } from "react";

const Exchange = () => {
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setPlatform(window.Telegram.WebApp.platform)
            }
        }
    }, []);

    return(
        platform !== 'tdesktop' ? (
        <div>
            <Card />
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