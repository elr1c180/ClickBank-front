
import React from "react";

const LeaderboardItem = ({ position, name, score }) => {
  return (
    <div className="leaderboard-item">
      <span className="position">{position}</span>
      <span className="name">{name}</span>
      <span className="score">{score} 🪙</span> {/* 🪙 или используйте нужную иконку монеты */}
    </div>
  );
};

export default LeaderboardItem;
