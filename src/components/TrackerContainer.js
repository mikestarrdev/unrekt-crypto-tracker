import react, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Coin from "./Coin";
import Filter from "./Filter";
import Portfolio from "./Portfolio";
import Favorites from "./Favorites";

function TrackerContainer({ coinList, setCoinList }) {
  // const [coinList, setCoinList] = useState([]);
  const [searched, setSearched] = useState("");
  const [displayedResults, setDisplayedResults] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  const [favoritesDbJSON, setFavoritesDbJSON] = useState([]);
  const [favoriteSymbolList, setFavoriteSymbolList] = useState([]);

  //fetch from GoinGecko API
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      })
      .then(({ data }) => {
        setCoinList(() => data);
      });
  }, []);

  //fetch from db.json
  useEffect(() => {
    fetch("http://localhost:4001/favorites")
      .then((resp) => resp.json())
      .then((data) => {
        return setFavoritesDbJSON(() => data);
      });
  }, []);

  // console.log(favoritesDbJSON);

  function handleSearched(e) {
    console.log(e.target.value);
    setSearched(() => e.target.value);
  }

  function handleDisplayedResults(e) {
    setDisplayedResults(() => e.target.value);
  }

  const filteredSearch = coinList.filter((coin) => {
    const coinId = coin.id.toLowerCase().includes(searched.toLowerCase());
    const coinSymbol = coin.symbol
      .toLowerCase()
      .includes(searched.toLowerCase());
    if (searched === "") {
      return coin;
    } else if (coinId || coinSymbol) {
      return coin;
    }
  });

  const favoriteSymbolListArr = favoritesDbJSON.map((entry) => entry.symbol);

  console.log(favoriteSymbolListArr);

  const coins = filteredSearch.map((coin, index) => {
    return (
      <Coin
        coin={coin}
        name={coin.name}
        symbol={coin.symbol}
        rank={index + 1}
        key={coin.id}
        image={coin.image}
        currentPrice={coin.current_price}
        ath={coin.ath}
        high24h={coin.high_24h}
        low24h={coin.low_24h}
        priceChangePercent24h={coin.price_change_percentage_24h}
        favoriteList={favoriteList}
        setFavoriteList={setFavoriteList}
        favoritesDbJSON={favoritesDbJSON}
        favoriteSymbolList={favoriteSymbolList}
      />
    );
  });

  return (
    <div>
      {/* place code below into nested route */}
      {/* <div className="tracking-container">
        <Filter
          searched={searched}
          handleSearched={handleSearched}
          handleDisplayedResults={handleDisplayedResults}
        />
        <br />
        <h3>Tracker Container</h3>
        <div>{coins}</div>
      </div> */}

      <Routes>
        <Route
          path="/"
          element={
            <div className="tracking-container">
              <Filter
                searched={searched}
                handleSearched={handleSearched}
                handleDisplayedResults={handleDisplayedResults}
              />
              <br />
              <h2>Top 100 coins</h2>
              <div className="coin-container">{coins}</div>
            </div>
          }
        />
        <Route
          exact
          path="/favorites"
          element={
            <Favorites
              coinList={coinList}
              favoritesDbJSON={favoritesDbJSON}
              favoriteSymbolListArr={favoriteSymbolListArr}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default TrackerContainer;
