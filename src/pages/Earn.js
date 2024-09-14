import React, { useEffect, useState } from "react";
import cl from './src/Earn/Earn.module.css';
import Navbar from "../components/Navbar/Navbar";
import logo from '../components/Navbar/logohand.png';
import { Link } from "react-router-dom";

const Earn = () => {
    const [tasks, setTasks] = useState([]);
    const [balance, setBalance] = useState(0); // Добавляем состояние для баланса
    const [chatId, setChatId] = useState(''); // Состояние для chatId

    useEffect(() => {
        // Получение chatId из Telegram WebApp или установка значения по умолчанию
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setChatId(user.id);
            } else {
                setChatId('991561880');
            }
        }

        const fetchTasks = async (chatId) => {
            try {
                const response = await fetch(`https://bankclick-bot.ru/get_tasks/${chatId}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks(chatId);
    }, [chatId]); // Обновление при изменении chatId

    const handleTaskCompletion = async (chatId, taskId, earn) => {
        try {
            const response = await fetch(`https://bankclick-bot.ru/complete_task/${chatId}/${taskId}`, {
                method: 'POST',
            });

            const result = await response.json();
            if (response.ok) {
                setBalance(balance + earn); // Обновление баланса после выполнения задания
            } else {
                console.error("Error completing task:", result.error);
            }
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    return (
        <div className={cl.EarnWrap}>
            <div className={cl.Header}>
                <img src={logo} alt="logo" />
                <h2>Start Earning</h2>
            </div>
            <div className={cl.Tasks}>
                <h4>Active Tasks</h4>

                {tasks.length > 0 ? tasks.map(task => (
                    <Link 
                        key={task.id} 
                        to={task.url} 
                        style={{ background: `linear-gradient(270deg, ${task.left_gradient} 4%, ${task.right_gradient} 86%)` }}
                        onClick={() => handleTaskCompletion(chatId, task.id, task.earn)} // Передаем chatId, taskId, и earn
                    >
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
