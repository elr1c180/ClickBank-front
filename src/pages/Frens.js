import React from "react";
import logo from '../components/Navbar/logohand.png'
import cl from './src/Frens/Frens.module.css'
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const Frens = () => {
    let text = 'Start earning with me!'
    let url = `https://t.me/clickbankcoin_bot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}`

    let link = `https://t.me/share/url?url=${url}&text=${text}`

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const url = `https://t.me/clickbankcoin_bot?start=${userId}`;
    
        try {
          await navigator.clipboard.writeText(url);
          // Отображаем уведомление в WebApp (зависит от возможностей Telegram API)
          if (window.Telegram.WebApp) {
            window.Telegram.WebApp.showAlert('Copied!'); // Замените на фактический метод, если доступен
          } else {
            alert('Copied!');
          }
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };
    return(
        <center>
        <div className={cl.Wrap}>
            <div className={cl.Airdrop}>
                <img src={logo} alt="" />
                <p>Invite your Frens in our project</p>
                <Link to={link}>
                    <button className={cl.Share}>
                        Share
                    </button>
                </Link>
                <button className={cl.Share} onClick={copyToClipboard}>
                    Copy
                </button>
            </div>
            <div className={cl.usernameContainer}>
                <span class={cl.username}>elr1c180</span>
            </div>
            <Navbar/>
        </div>
        <Navbar/>
        </center>
        
    )
}

export default Frens;