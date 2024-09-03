// Leaders.js
import React from "react";
import cl from './src/ld/ld.module.css'
import { useState, useEffect } from "react";
import basic from './src/ld/gray.svg'
import starter from './src/ld/green.svg'
import advanced from './src/ld/blue.svg'
import premium from './src/ld/red.svg'
import elite from './src/ld/purple.svg'

const levels = [
    { name: 'Basic', boxShadow: "0px 61px 199px 12px rgba(100,100,100,0.75) inset", titleColor: '#2E3528', levelCard: basic, content: 'Basic content' },
    { name: 'Starter', boxShadow: '0px 61px 199px 12px rgba(117,173,61,0.41) inset', titleColor: '#2E3528', levelCard: starter, content: 'Starter content' },
    { name: 'Advanced', boxShadow: '0px 61px 199px 12px rgba(20,141,206,0.41) inset', titleColor: '#231A1A', levelCard: advanced , content: 'Advanced content' },
    { name: 'Premium', boxShadow: '0px 61px 199px 12px rgba(193,42,34,0.41) inset', titleColor: '#B7B7B7', levelCard: premium, content: 'Premium content' },
    { name: 'Elite', boxShadow: '0px 61px 199px 12px rgba(176,44,120,0.41) inset', titleColor: '#B7B7B7', levelCard: elite, content: 'Elite content' },
  ];

const Leaders = () => {

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    useEffect(() => {
        document.body.style.margin = '0';
    
        return () => {
          document.body.style.margin = '';
        };
      }, []);

    const handlePrev = () => {
    setCurrentLevelIndex((prevIndex) =>
        prevIndex === 0 ? levels.length - 1 : prevIndex - 1
    );
    };

    const handleNext = () => {
    setCurrentLevelIndex((prevIndex) =>
        prevIndex === levels.length - 1 ? 0 : prevIndex + 1
    );
    };

    const currentLevel = levels[currentLevelIndex];
  
  const leaderboardData = [
    { position: 1, name: "Anton", score: "+1 230 560" },
    { position: 2, name: "Gleb", score: "+1 127 487" },
    { position: 3, name: "Nikita", score: "+1 084 760" },
    { position: 4, name: "Fedya", score: "+982 590" },
    { position: 5, name: "Stepa", score: "+830 300" },
    { position: 6, name: "David", score: "+827 487" },
    { position: 7, name: "Oleg", score: "+782 160" },
    { position: 8, name: "Vlad", score: "+772 228" },
  ];

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        transition: 'box-shadow 0.5s',
        boxShadow: currentLevel.boxShadow, // Применяем boxShadow к контейнеру
        padding: '20px',
      }}
    >
        <div className={cl.levelName}>
            <span className={cl.navigate}>
                <i class="fa-solid fa-chevron-left" onClick={handlePrev}></i>
            </span> 
            <span className={cl.currentName} style={{color: currentLevel.titleColor}}>{currentLevel.name}</span>
            <span className={cl.navigate}>
                <i class="fa-solid fa-chevron-right"  onClick={handleNext}></i>
            </span>
            
        </div>
        <div className={cl.Card}>
                <img src={currentLevel.levelCard} alt={currentLevel.name}/>
            </div>
      {/* <h1>{currentLevel.name}</h1>
      <p>{currentLevel.content}</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button onClick={handlePrev}>&lt; Prev</button>
        <button onClick={handleNext}>Next &gt;</button>
      </div> */}
    </div>
  );
};

export default Leaders;
