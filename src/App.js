import React from 'react';
import './App.css';
import Exchange from './pages/Exchange';
import Airdrop from './pages/Airdrop';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Earn from './pages/Earn';
import Frens from './pages/Frens';
import Leaders from './pages/LD';
import Bonus from './pages/Bonus'

function App() {
  const tele = window.Telegram.WebApp;
  tele.expand()

  window.Telegram.WebApp.setBackgroundColor('#000000');
  window.Telegram.WebApp.setHeaderColor('#FFFFFF');
  
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Exchange />} />
            <Route path="/Exchange" element={<Exchange />} />
            <Route path="/Airdrop" element={<Airdrop />} />
            <Route path="/Frens" element={<Frens/>}/>
            <Route path="/Earn" element={<Earn/>}/>
            <Route path="/Bonus" element={<Bonus/>} />
            <Route path="/ld" element={<Leaders/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
