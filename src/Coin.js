import React from "react";

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
}) {
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
    </div>
  );
}

export default Coin;
