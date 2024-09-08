import React from "react";
import cl from './src/ld/ld.module.css'
import { useState, useEffect } from "react";
import basic from './src/ld/cardgray 1.svg'
import starter from './src/ld/card green 1 (3).svg'
import advanced from './src/ld/card blue 1.svg'
import premium from './src/ld/red.svg'
import elite from './src/ld/card purple 1.svg'
import clk from '../components/Navbar/logohand.png'

const levels = [
    { name: 'Basic', boxShadow: "0px 61px 199px 12px rgba(100,100,100,0.75) inset", titleColor: '#2E3528', levelCard: basic, barColor: 'linear-gradient(to right, #979797, #4b4848)', scoreColor: '#343532' },
    { name: 'Starter', boxShadow: '0px 61px 199px 12px rgba(117,173,61,0.41) inset', titleColor: '#2E3528', levelCard: starter, barColor: 'linear-gradient(270deg, rgba(175,221,128,1) 4%, rgba(67,129,53,1) 86%)', scoreColor: '#343532' },
    { name: 'Advanced', boxShadow: '0px 61px 199px 12px rgba(20,141,206,0.41) inset', titleColor: '#231A1A', levelCard: advanced , barColor: 'linear-gradient(270deg, rgba(121,196,234,1) 4%, rgba(25,76,122,1) 86%)', scoreColor: '#232526' },
    { name: 'Premium', boxShadow: '0px 61px 199px 12px rgba(193,42,34,0.41) inset', titleColor: '#B7B7B7', levelCard: premium, barColor: 'linear-gradient(270deg, rgba(233,132,127,1) 4%, rgba(164,55,49,1) 67%, rgba(146,42,42,1) 86%)', scoreColor: '#232526' },
    { name: 'Elite', boxShadow: '0px 61px 199px 12px rgba(176,44,120,0.41) inset', titleColor: '#B7B7B7', levelCard: elite, barColor: 'linear-gradient(270deg, rgba(178,41,121,1) 4%, rgba(60,23,45,1) 86%)', scoreColor: '#232526' },
  ];

const Leaders = () => {

    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.overflow = 'visible';
    
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
  


  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        transition: 'box-shadow 0.5s',
        boxShadow: currentLevel.boxShadow,
        padding: '20px',
      }}
    >
        <div className={cl.levelName}>
            <span className={cl.navigate}>
                <i class="fa-solid fa-chevron-left" onClick={handlePrev}></i>
            </span> 
            <span className={cl.currentName} style={{color: currentLevel.titleColor}}>{currentLevel.name}</span>
            <span className={cl.navigate}>
                <i class="fa-solid fa-chevron-right" onClick={handleNext}></i>
            </span>
            
        </div>
        <div className={cl.Card}>
                <img src={currentLevel.levelCard} alt={currentLevel.name}/>
        </div>
        <div className={cl.levelBar}>
          <div style={{
              width: '90%',
              height: '5px',
              backgroundColor: '#e0e0e0',
              borderRadius: '2px',
              overflow: 'hidden',
              marginLeft: 'auto',
              marginRight: 'auto'
          }}>
            <div style={{
              width: '30%',
              height: '100%',
              background: currentLevel.barColor,
              borderRadius: '2px'
            }}></div>
          </div>
          <h3 className={cl.Balance} style={{ color: currentLevel.scoreColor }}>189k/500k</h3>
        </div>
      {/* <h1>{currentLevel.name}</h1>
      <p>{currentLevel.content}</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button onClick={handlePrev}>&lt; Prev</button>
        <button onClick={handleNext}>Next &gt;</button>
      </div> */}
      <div className={cl.LeaderboardTable} style={{ textAlign: 'center' }}>
  <p style={{ color: '#555951' }}>Leaderboard:</p>
  <div
    className={cl.DataTable}
    style={{
      border: '1px solid black',
      borderRadius: '15px',
      padding: '10px 0',
    }}
  >
    <div
      className={cl.User}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px'
      }}
    >
      <span className={cl.Position} style={{ fontSize: '20px', marginRight:'10px' }}>1</span>

      <span
        style={{
          fontSize: '28px',
          color: '#090E05',
        }}
      >
        Anton
      </span>

      <span
        style={{
          fontSize: '24px',
          color: '#090E05',
          marginLeft: '52px'
        }}
      >
        +1 230 560
      </span>

      <img style={{ width: '7%', marginBottom: '1px' }} src={clk} alt="Icon" />
    </div>

    <div className={cl.Divider} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <hr />
    </div>
  </div>
</div>

    </div>
  );
};

export default Leaders;
