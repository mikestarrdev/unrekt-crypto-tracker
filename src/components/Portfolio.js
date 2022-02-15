import react, { useState } from "react";

function Portfolio() {
  const [portfolio, setPortfolio] = useState({});
  const [coin, setCoin] = useState("");
  const [dateOfBuy, setDateOfBuy] = useState("");
  const [price, setPrice] = useState("");
  const [gasCost, setGasCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");

  function handleSubmitCoin(e) {
    e.preventDefault();
    const newCoinEntry = {
      coin,
      dateOfBuy: Date.parse(dateOfBuy) / 1000,
      price,
      gasCost,
      quantity,
      remarks,
    };
    console.log(newCoinEntry);
    setPortfolio({ ...portfolio, newCoinEntry });
    //add entry to db.json file
    fetch("http://localhost:4001/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCoinEntry),
    }).then((response) => response.json());
  }

  return (
    <div className="porfolio-container">
      <h2>Portfolio</h2>
      <form className="portfolio-form" onSubmit={handleSubmitCoin}>
        <label htmlFor="coin">
          Coin{" "}
          <input
            type="text"
            value={coin}
            placeholder="coin sybol (e.g. BTC)"
            onChange={(e) => setCoin(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="dateOfBuy">
          Date of purchase{" "}
          <input
            type="date"
            value={dateOfBuy}
            placeholder="Enter date"
            onChange={(e) => {
              setDateOfBuy(e.target.value);
            }}
          />
        </label>
        <br />
        <label htmlFor="price">
          Price{" "}
          <input
            type="number"
            value={price}
            placeholder="Price in USD value"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="gasCost">
          Gas cost{" "}
          <input
            type="number"
            value={gasCost}
            placeholder="Price in USD value"
            onChange={(e) => setGasCost(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="quantity">
          Quantity{" "}
          <input
            type="number"
            value={quantity}
            placeholder="Enter quantity..."
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </label>
        <br />
        <label htmlFor="remarks">
          Remarks{" "}
          <input
            type="number"
            value={remarks}
            placeholder="Comments..."
            onChange={(e) => {
              setRemarks(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <button type="submit">Enter stats</button>
      </form>
    </div>
  );
}

export default Portfolio;
