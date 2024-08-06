import React from "react";
import cl from './Airdrop.module.css'
import { TonConnectButton } from "@tonconnect/ui-react";    
import logo from '../Navbar/logohand.png'

const AirdropModule = () => {
    return (
        <div className={cl.Airdrop}>
            <img src={logo} alt="" />
            <p>Link your wallets to Ton and start earning money</p>
        <center><TonConnectButton /></center>
        </div>
    )
}

export default AirdropModule;