import React, { useState } from "react";
import axios from "axios";

function Coin({
  coin,
  name,
  symbol,
  rank,
  image,
  currentPrice,
  ath,
  lastUpdated,
  high24h,
  low24h,
  priceChangePercent24h,
  favoriteList,
  setFavoriteList,
  favoritesDbJSON,
  favoriteSymbolList,
}) {
  // const favoriteSymbolList = favoritesDbJSON.map((entry) => entry.symbol);

  // console.log(favoritesDbJSON);
  function handleFavClick(e) {
    e.preventDefault();

    console.log(favoriteSymbolList, coin.symbol);
    if (!favoriteSymbolList.includes(coin.symbol)) {
      console.log("coin not in favoriteSYmbolList, adding to db.json");
      setFavoriteList(() => {
        return [...favoriteList, coin];
      });

      postFavorites("http://localhost:4001/favorites", {
        name: coin.id,
        symbol: coin.symbol,
        isFavorite: true,
      }).then((data) => console.log(data));
    } else {
      console.log("not adding");
    }
  }

  // console.log(favoritesDbJSON);

  async function postFavorites(url, data) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((resp) => resp.json());
  }

  return (
    <div className="coin">
      <h3>
        <img className="coin-image" src={image} alt={name} /> {name}
      </h3>{" "}
      <p>
        <em>
          <strong>Symbol:</strong> ({symbol.toUpperCase()})
        </em>
      </p>
      <span className="coin-rank">
        <strong>Rank:</strong> #{rank}
      </span>
      <p>
        <strong>Price:</strong> ${currentPrice.toLocaleString()}
      </p>
      <p>
        <strong>24h high:</strong> ${high24h}
      </p>
      <p>
        <strong>24h Low:</strong> ${low24h}
      </p>
      <p>
        <strong>ATH:</strong> ${ath.toLocaleString()}
      </p>
      <p>
        <strong>24h change:</strong> {priceChangePercent24h.toFixed(2)}%
      </p>
      <button className="fav-btn" onClick={handleFavClick}>
        ⭐️ Favorite
      </button>
      {/* render chart */}
    </div>
  );
}

export default Coin;
