import React from "react";
import logo from '../components/Navbar/logohand.png'
import cl from './src/Frens/Frens.module.css'


const Frens = () => {
    return(
        <center>
        <div className={cl.Wrap}>
            <div className={cl.Airdrop}>
                <img src={logo} alt="" />
                <p>Link your wallets to Ton and start earning money</p>
            </div>
            <div className={cl.usernameContainer}>
                <span class={cl.username}>elr1c180</span>
            </div>
        </div>
        </center>
    )
}

export default Frens;