import React from "react";
import cl from './myNavbar.module.css'
import logo from './logohand.png'
import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <div className={cl.myNavbar}>
            <Link to="/Exchange/"  className={cl.navItem}>
                <div className={cl.icon}>   
                    <i class="fa-solid fa-wallet"></i>
                </div>
                <span>Exchange</span>
            </Link>

            <Link to="/Earn/"  className={cl.navItem}>
                <div className={cl.icon}>   
                <i class="fa-solid fa-money-bill"></i>
                </div>
                <span>Earn</span>
            </Link>

            <Link to="/Bonus/"  className={cl.navItem}>
                <div className={cl.icon}>   
                <i class="fa-regular fa-calendar-days"></i>
                </div>
                <span>Boost</span>
            </Link>

            <Link to="/Frens/"  className={cl.navItem}>
                <div className={cl.icon}>   
                <i class="fa-solid fa-user-group"></i>
                </div>
                <span>Frens</span>
            </Link>

            <Link to="/Airdrop/"  className={cl.navItem}>
                <div >   
                    <img src={logo} alt="" />
                </div>
                <span>Airdrop</span>
            </Link>
        </div>
    )
}

export default Navbar;