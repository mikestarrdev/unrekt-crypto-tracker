import react, { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import Filter from "./Filter";

function TrackerContainer() {
  const [coinList, setCoinList] = useState([]);
  const [searched, setSearched] = useState("");
  const [displayedResults, setDisplayedResults] = useState("50");

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res)
      .then((data) => {
        console.log("data: ", data.data);
        setCoinList(() => data.data);
      });
  }, []);

  //   console.log("coinList: ", coinList);

  const coins = coinList.map((coin, index) => {
    return (
      <Coin
        rank={index + 1}
        key={coin.id}
        name={coin.name}
        image={coin.image}
        currentPrice={coin.current_price}
        ath={coin.ath}
        lastUpdated={coin.last_updated}
      />
    );
  });

  function handleSearched(e) {
    console.log(e.target.value);
    setSearched(() => e.target.value);
  }

  function handleDisplayedResults(e) {
    setDisplayedResults(() => e.target.value);
  }

  //   console.log(setSearched, searched);

  return (
    <div>
      <div className="tracking-container">
        {/* <button className="refresh-btn">Refresh Data 🔄</button> */}
        <Filter
          searched={searched}
          handleSearched={handleSearched}
          handleDisplayedResults={handleDisplayedResults}
        />
        {coins}
      </div>
    </div>
  );
}

export default TrackerContainer;
