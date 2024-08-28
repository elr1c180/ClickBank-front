import React from "react";
import logo from '../components/Navbar/logohand.png'
import cl from './src/Frens/Frens.module.css'
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Frens = () => {
    const [referrals, setReferrals] = useState([]);

    useEffect(() => {
      const fetchReferrals = async (chatId) => {
        try {
          const response = await fetch(`https://bankclick-bot.ru/user-ref/${chatId}/`);  // Replace with your API URL
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setReferrals(data);  
  
        } catch (error) {
          console.log(error);
        }
      };
      const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
      fetchReferrals(chatId);
    }, []); 

    let text = 'Start earning with me!'
    let url = `https://t.me/clickbankcoin_bot?start=${window.Telegram.WebApp.initDataUnsafe.user.id}`;

    let link = `https://t.me/share/url?url=${url}&text=${text}`

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        const userId = window.Telegram.WebApp.initDataUnsafe.user.id || 991561880;
        const url = `https://t.me/clickbankcoin_bot?start=${userId}`;
    
        try {
          await navigator.clipboard.writeText(url);
          if (window.Telegram.WebApp) {
            window.Telegram.WebApp.showAlert('Copied!');
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
                        Shar123e
                    </button>
                </Link>
                <button className={cl.Share} onClick={copyToClipboard}>
                    Copy
                </button>
            </div>
            
            {referrals.map((referral) => (
              <div className={cl.usernameContainer}>
                <span class={cl.username}>{referral.username}</span>
              </div>
            ))}
            <Navbar/>
        </div>
        </center>
        
    )
}

export default Frens;