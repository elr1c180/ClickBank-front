import React from "react";
import cl from './src/Earn/Earn.module.css'
import Navbar from "../components/Navbar/Navbar";
import logo from '../components/Navbar/logohand.png'
import tg from './src/Earn/tg.png'

const Earn = () => {
    return(
        <div className={cl.EarnWrap}>
            <div className={cl.Header}>
                <img src={logo} alt="logo"/>
                <h2>Start Earning</h2>
            </div>
            <div className={cl.Tasks}>
                <h4>Active Tasks</h4>

                <div className={cl.Task}>
                    <div className={cl.taskIcon}>
                        <img src={tg} />
                    </div>

                    <div className={cl.taskTitle}>
                        <p>Join Telegram</p>
                    </div>

                    <div className={cl.taskPool}>
                        <p>25.000</p>
                        <img src={logo} alt="price"/>
                    </div>
                </div>
            </div>
            <Navbar/>
        </div>
        
    )
}

export default Earn