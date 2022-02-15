import react, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import Filter from "./Filter";
import Portfolio from "./Portfolio";

function TrackerContainer() {
  const [coinList, setCoinList] = useState([]);
  const [searched, setSearched] = useState("");
  const [displayedResults, setDisplayedResults] = useState("50");

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      })
      .then(({ data }) => {
        // console.log("data: ", data);
        setCoinList(() => data);
      });
  }, []);

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

  const coins = filteredSearch.map((coin, index) => {
    return (
      <Coin
        name={coin.name}
        symbol={coin.symbol}
        rank={index + 1}
        key={coin.id}
        image={coin.image}
        currentPrice={coin.current_price}
        ath={coin.ath}
        lastUpdated={coin.last_updated}
        high24h={coin.high_24h}
        low24h={coin.low_24h}
        priceChangePercent24h={coin.price_change_percentage_24h}
      />
    );
  });

  return (
    <div>
      <div className="tracking-container">
        {/* <button className="refresh-btn">Refresh Data 🔄</button> */}
        <Filter
          searched={searched}
          handleSearched={handleSearched}
          handleDisplayedResults={handleDisplayedResults}
        />
        <Portfolio coinList={coinList} />
        <div>{coins}</div>
      </div>
    </div>
  );
}

export default TrackerContainer;
