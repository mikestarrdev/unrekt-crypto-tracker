import React, { useEffect, useState } from "react";
import axios from "axios";

function Coin({
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
}) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`
      )
      .then((res) => res)
      .then((chart) => {
        // console.log(chart.prices);
        setChartData(chart.data);
      });
  }, []);

  // console.log("chartData", chartData);

  return (
    <div className="coin-container">
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
      <p className="small-stats">
        <strong>Last updated:</strong> <em>new Date({lastUpdated})</em>
      </p>
      <p>
        <strong>Price change % 24h:</strong> ${priceChangePercent24h}
      </p>
      {/* <div>{fillChart}</div> */}
    </div>
  );
}

export default Coin;
