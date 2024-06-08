import React, { useState, useEffect } from "react";
import "./Search.css"; // Assuming you move the styles to this CSS file
import Api from "./Api"; // Import the Api component

const Search = () => {
  const [filter, setFilter] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // Track the selected option
  const [selectedCoins, setSelectedCoins] = useState([]); // Track the selected coins

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch("https://api-eu.okotoki.com/coins");
        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }
        const data = await response.json();
        setCoins(data); // Set all coins from the API
        const topCoins = data.slice(0, 10); // Get only the first 10 coins
        setFilteredCoins(topCoins);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    // Filter coins based on selected option
    if (showFavorites) {
      const favorites = coins.filter((coin) => coin.isFavorite);
      setFilteredCoins(favorites);
    } else {
      const filtered = coins.filter(
        (coin) => coin && coin.toUpperCase().includes(filter.toUpperCase())
      );
      setFilteredCoins(filtered);
    }
  }, [showFavorites, coins, filter]);

  const filterFunction = (e) => {
    e.preventDefault(); // Prevent default form submission
    const searchTerm = e.target.value.toUpperCase();
    setFilter(searchTerm);
  };

  const handleSelectCoin = (coin) => {
    if (!selectedCoins.includes(coin)) {
      setSelectedCoins([...selectedCoins, coin]);
    } else {
      const updatedSelectedCoins = selectedCoins.filter((c) => c !== coin);
      setSelectedCoins(updatedSelectedCoins);
    }
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        id="searchInput"
        onChange={filterFunction}
        placeholder="Search..."
        value={filter}
      />
      <div className="dropdown-content" id="myDropdown">
        <div className="selector">
          <div
            type="button"
            onClick={() => setShowFavorites(false)} // Show all coins
            className={!showFavorites ? "active" : ""}
          >
            ALL COINS
          </div>
          <div
            type="button"
            onClick={() => setShowFavorites(true)} // Show favorites
            className={showFavorites ? "active" : ""}
          >
            FAVOURITES
          </div>
        </div>
        {selectedCoins.map((coin, index) => (
          <a key={index} href="#">
            {coin}
          </a>
        ))}
        {filteredCoins.map((coin, index) => (
          <a
            key={index}
            href="#"
            onClick={() => handleSelectCoin(coin)}
            className={selectedCoins.includes(coin) ? "selected" : ""}
          >
            {coin}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Search;
