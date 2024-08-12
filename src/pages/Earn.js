import React from "react";
import cl from './src/Earn/Earn.module.css'
import Navbar from "../components/Navbar/Navbar";
import logo from '../components/Navbar/logohand.png'
import tg from './src/Earn/tg.png'
import yt from './src/Earn/yt.png'
import ig from './src/Earn/ig.png'
import twitter from './src/Earn/x.png'
import fb from './src/Earn/fb.png'
import { Link } from "react-router-dom";

const Earn = () => {
    return(
        <div className={cl.EarnWrap}>
            <div className={cl.Header}>
                <img src={logo} alt="logo"/>
                <h2>Start Earning</h2>
            </div>
            <div className={cl.Tasks}>
                <h4>Active Tasks</h4>

                <Link to="https://t.me/clickbankcoin">
                    <div className={cl.tgTask}>
                    <div className={cl.taskIcon}>
                        <img src={tg} alt="tg"/>
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Join our Telegram</p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                    </div>
                </Link>

                <Link to="">
                <div className={cl.igTask}>
                    <div className={cl.taskIcon}>
                        <img src={ig} alt="tg"/>
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Follow us on Instagram</p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                </div>
                </Link>

                <Link to="">
                <div className={cl.ytTask}>
                    <div className={cl.taskIcon}>
                        <img src={yt} alt="tg"/>
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Watch us on YouTube </p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                </div>
                </Link>

                <Link to="">
                <div className={cl.xTask}>
                    <div className={cl.taskIcon}>
                        <img src={twitter} alt="tg"/>
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Follow our X</p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                </div>
                </Link>
                
                <Link to="">
                <div className={cl.facebookTask}>
                    <div className={cl.taskIcon}>
                        <img src={fb} alt="tg"/>
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Follow our Facebook</p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                </div>
                </Link>

            </div>
            
            <Navbar/>
        </div>
        
    )
}

export default Earn