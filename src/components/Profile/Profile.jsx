import React from "react";
import cl from './Profile.module.css'
import profile from './profile.svg'
import card from '../Card/cardgray.svg'
import { Link } from "react-router-dom";

const Profile = (user) => {

    return (
        <div className={cl.ProfileWrap}>
            <div className={cl.profileSide}>

                <img src={profile} className={cl.profileImg} alt="profile"/>
                
                <div className={cl.details}>
                    <p className={cl.username}>
                        <Link to="/ld/">{user.username}</Link>
                    </p>
                    <img className={cl.miniCard} src={card}/>
                </div>

                

            </div>
            <div className={cl.levelSide}>
                <p className={cl.levelLabel}>Basic</p>
                <div className={cl.progressBar}>
                    <div className={cl.progress}></div>
                </div>
            </div>
        </div>
    )
}

export default Profile;