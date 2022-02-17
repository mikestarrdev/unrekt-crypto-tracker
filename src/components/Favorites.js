import React, { useEffect, useState } from "react";
import Coin from "./Coin";

function Favorites({
  coinList,
  favoritesDbJSON,
  setFavoritesDbJSON,
  favoriteSymbolListArr,
}) {
  console.log("favoritesDbJSON", favoritesDbJSON);
  console.log("favoriteSymbolListArr", favoriteSymbolListArr);

  const displayFavorites = coinList.filter((coin) => {
    // console.log(favoriteSymbolListArr.includes(coin.symbol.toLowerCase()));
    return favoriteSymbolListArr.includes(coin.symbol.toLowerCase());
  });

  console.log("displayFavorites", displayFavorites);

  const favorites = displayFavorites.map((favorite, index) => {
    console.log(favorite);
    return (
      <Coin
        coin={favorite}
        name={favorite.name}
        symbol={favorite.symbol}
        rank={index + 1}
        key={favorite.id}
        image={favorite.image}
        currentPrice={favorite.current_price}
        ath={favorite.ath}
        high24h={favorite.high_24h}
        low24h={favorite.low_24h}
        priceChangePercent24h={favorite.price_change_percentage_24h}
      />
    );
  });

  //for coin in coinList array, if coin.id is found in favorites, add it to favoritesNoDupes

  //   const favoritesNoDupes = coinList.filter((coin) => {});

  //   console.log(favoritesNoDupes);

  //   const renderFavorites = favorites.map((favorite, index) => {
  //     console.log(favorite);
  //     return <Coin coin={favorite.name} key={index} />;
  //   });

  return (
    <div className="tracking-container">
      <h2>Your Favorites</h2>
      <div className="favorites coin-container">{favorites}</div>
    </div>
  );
}

export default Favorites;
