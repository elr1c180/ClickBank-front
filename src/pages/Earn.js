import React, { useEffect, useState } from "react";
import cl from './src/Earn/Earn.module.css';
import Navbar from "../components/Navbar/Navbar";
import logo from '../components/Navbar/logohand.png';
import tg from './src/Earn/tg.png';
import yt from './src/Earn/yt.png';
import ig from './src/Earn/new_ig.PNG';
import twitter from './src/Earn/x.png';
import fb from './src/Earn/fb.png';
import { Link } from "react-router-dom";

const Earn = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Подгружаем задания из API
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://bankclick-bot.ru/get_tasks/991561880');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className={cl.EarnWrap}>
            <div className={cl.Header}>
                <img src={logo} alt="logo" />
                <h2>Start Earning</h2>
            </div>
            <div className={cl.Tasks}>
                <h4>Active Tasks</h4>

                {tasks.length > 0 ? tasks.map(task => (
                    <Link key={task.id} to={task.url} style={{ background: `background: linear-gradient(270deg, ${task.left_gradient} 4%, ${task.right_gradient} 86%);` }}>
                        <div className={cl.Task}>
                            <div className={cl.taskIcon}>
                                <img src={`https://bankclick-bot.ru${task.icon}` || logo} alt={task.title} />
                            </div>
                            <div className={cl.taskTitle}>
                                <p>{task.title}</p>
                            </div>
                            <div className={cl.taskPool}>
                                <p>{task.earn}</p>
                                <img src={logo} alt="price" />
                            </div>
                        </div>
                    </Link>
                )) : <p>No active tasks available.</p>}
            </div>
            <Navbar />
        </div>
    );
};

export default Earn;
