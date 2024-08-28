import React, { useState, useEffect } from "react";
import logo from '../components/Navbar/logohand.png'; // Ensure correct path
import cl from './src/Frens/Frens.module.css'; // Ensure correct path
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const Frens = () => {
  const [referrals, setReferrals] = useState([]); // State to hold referrals data
  const [error, setError] = useState(null); // State to manage errors
  const [copied, setCopied] = useState(false); // State to manage copied status

  // Fetch referrals data from the backend API
  useEffect(() => {
    const fetchReferrals = async (chatId) => {
      try {
        const response = await fetch(`https://bankclick-bot.ru/user-ref/${chatId}/`);  // Replace with your API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReferrals(data);  // Set referrals data to state
        setError(null); // Clear error if successful
      } catch (error) {
        console.error(error);
        setError('Failed to fetch referrals. Please try again later.'); // Set error message
      }
    };

    // Fetch chatId from Telegram WebApp or use default value
    const chatId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
    fetchReferrals(chatId);
  }, []);

  // Define share text and URL
  const text = 'Start earning with me!';
  const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 991561880;
  const url = `https://t.me/clickbankcoin_bot?start=${userId}`;
  const link = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true); // Set copied state to true
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Copied!');
      } else {
        alert('Copied!');
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text. Please try again.'); // Set error message for copying
    }
  };

  return (
    <center>
      <div className={cl.Wrap}>
        <div className={cl.Airdrop}>
          <img src={logo} alt="Logo" />
          <p>Invite your Frens to our project</p>
          
          {/* Display share button */}
          <Link to={link}>
            <button className={cl.Share}>Share</button>
          </Link>
          
          {/* Display copy button */}
          <button className={cl.Share} onClick={copyToClipboard}>
            Copy
          </button>
          
          {/* Display error message if present */}
          {error && <div className={cl.error}>{error}</div>}
        </div>

        {/* Display list of referrals */}
        {referrals.length > 0 ? (
          referrals.map((referral) => (
            <div key={referral.chat_id} className={cl.usernameContainer}>
              <span className={cl.username}>{referral.username}</span>
            </div>
          ))
        ) : (
          !error && <p>No referrals found.</p>
        )}

        {/* Navbar Component */}
        <Navbar />
      </div>
    </center>
  );
};

export default Frens;
