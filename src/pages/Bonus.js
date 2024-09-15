import React, { useState, useEffect } from "react";
import Profile from "../components/Profile/Profile";
import { Link, useNavigate } from "react-router-dom";
import coin from "../components/Navbar/logohand.png";
import Navbar from "../components/Navbar/Navbar";

const Bonus = () => {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1); // Default to "Marketing"

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`https://bankclick-bot.ru/get_cards/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const navigate = useNavigate();
  const BackButton = window.Telegram.WebApp.BackButton;
  BackButton.show();

  BackButton.onClick(function () {
    BackButton.hide();
  });

  window.Telegram.WebApp.onEvent("backButtonClicked", function () {
    navigate("/");
  });

  useEffect(() => {
    document.body.style.overflow = "visible";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  const filteredCards = cards.filter((card) => card.category === String(selectedCategory));

  return (
    <div style={styles.container}>
      <Profile username={"elr1c180"} />
      <div style={styles.header}>
        <button
          style={selectedCategory === 1 ? styles.active : styles.headerButton}
          onClick={() => setSelectedCategory(1)}
        >
          Marketing
        </button>
        <button
          style={selectedCategory === 2 ? styles.active : styles.headerButton}
          onClick={() => setSelectedCategory(2)}
        >
          System
        </button>
        <button
          style={selectedCategory === 3 ? styles.active : styles.headerButton}
          onClick={() => setSelectedCategory(3)}
        >
          Geography
        </button>
      </div>
      <div style={styles.cardsContainer}>
        {filteredCards.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              background: `linear-gradient(to bottom, #${card.first_gradient}, #${card.second_gradient})`,
            }}
          >
            <img src={`https://bankclick-bot.ru${card.img}`} alt={card.title} style={styles.icon} />
            <h2 style={styles.name}>{card.title}</h2>
            <p style={styles.earnText}>
              Earn per hour: <strong>{card.earn_per_hour}</strong>
            </p>
            <hr style={styles.divider} />
            <div style={styles.bottom}>
              <span style={styles.level}>1lvl</span>
              <span style={styles.coins}>
                {card.price} <img src={coin} alt="coin" style={styles.coinIcon} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

const styles = {
  active: {
    flex: 1,
    padding: "10px",
    margin: "0 5px",
    border: "none",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none",
    background: "linear-gradient(90deg, rgba(244,165,23,1) 0%, rgba(142,96,13,1) 100%)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "13px",
    minHeight: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Lato",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    marginTop: "30px",
    width: "100%",
    maxWidth: "500px",
  },
  headerButton: {
    flex: 1,
    padding: "10px",
    margin: "0 5px",
    border: "none",
    borderRadius: "20px",
    background: "#f4f4f8",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "500px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 20px 30px 20px",
    borderRadius: "15px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    fontFamily: "Roboto, sans-serif",
  },
  // icon: {
  //   width: "110px",
  //   height: "108px",
  // },
  name: {
    fontSize: "15px",
    margin: "0px 0",
    color: "black",
  },
  earnText: {
    fontSize: "13px",
    marginBottom: "5px",
    margin: "5px 0",
  },
  divider: {
    width: "115%",
    border: "0.5px solid #ddd",
    margin: "10px 0",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
  },
  level: {
    color: "#333",
    borderRadius: "10px",
    padding: "5px 10px",
    fontSize: "13px",
    fontWeight: "bold",
    fontFamily: "Lato, sans-serif",
  },
  coins: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
  },
  coinIcon: {
    width: "27px",
    height: "28px",
    marginLeft: "5px",
  },
};

export default Bonus;
