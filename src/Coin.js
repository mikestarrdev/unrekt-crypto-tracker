import React from "react";

function Coin({ name, symbol, rank, image, currentPrice, ath, lastUpdated }) {
  return (
    <div className="coin-container">
      <h3>
        <img className="coin-image" src={image} alt={name} /> {name}
      </h3>{" "}
      <p className="coin-rank">({symbol.toUpperCase()})</p>
      <span className="coin-rank">
        <strong>Rank:</strong> #{rank}
      </span>
      <p>
        <strong>Price:</strong> ${currentPrice.toLocaleString()}
      </p>
      <p>
        <strong>All-time-high:</strong> ${ath.toLocaleString()}
      </p>
      <p className="small-stats">
        <strong>Last updated:</strong> <em>{lastUpdated}</em>
      </p>
    </div>
  );
}

export default Coin;
