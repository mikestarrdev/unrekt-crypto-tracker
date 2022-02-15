import { tab } from "@testing-library/user-event/dist/tab";
import react, { useState, useEffect } from "react";

function Portfolio({ coinList }) {
  const [portfolioEntry, setPortfolioEntry] = useState({});
  const [coin, setCoin] = useState("btc");
  const [dateOfBuy, setDateOfBuy] = useState("");
  const [price, setPrice] = useState("");
  const [gasCost, setGasCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  const cryptoTicker = coinList.map((ticker, index) => {
    return (
      <option value={ticker.symbol} key={(ticker, index + 1)}>
        {ticker.name} - ({ticker.symbol.toUpperCase()})
      </option>
    );
  });

  function handleSubmitCoin(e) {
    e.preventDefault();
    const newCoinEntry = {
      coin,
      dateOfBuy,
      price,
      gasCost,
      quantity,
      remarks,
    };

    setPortfolioEntry({ ...portfolioEntry, newCoinEntry });
    //add entry to db.json file
    fetch("http://localhost:4001/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCoinEntry),
    }).then((resp) => resp.json());
  }

  //fetch data from db.json
  useEffect(() => {
    fetch("http://localhost:4001/portfolio")
      .then((resp) => resp.json())
      .then((stats) => {
        // console.log(stats);
        setPortfolio(stats);
      });
  }, [portfolioEntry]);

  const tableHeadings = portfolio.map((entry, index) => {
    return (
      <>
        <tr>
          <td>{entry.coin.toUpperCase()}</td>
          <td>{entry.dateOfBuy}</td>
          <td>{entry.quantity}</td>
          <td>{entry.price}</td>
          <td>{!entry.gasCost ? "-" : entry.gasCost}</td>
        </tr>
      </>
    );
  });

  //put total costs into array
  const totalCostUSD = portfolio.map((cost) => {
    return cost.price * cost.quantity;
  });
  //calculate sum of costs
  function sumCostUSD() {
    let sum = 0;
    for (let i = 0; i < totalCostUSD.length; i++) {
      sum += parseInt(totalCostUSD[i]);
    }
    return sum;
  }

  const totalPortfolioValue = portfolio.map((entry) => {
    return {}
  });

  return (
    <div className="portfolio-container">
      <div className="column-left">
        <h2>Portfolio</h2>
        <form onSubmit={handleSubmitCoin}>
          <select value={coin} onChange={(e) => setCoin(e.target.value)}>
            {cryptoTicker}
          </select>
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
              type="text"
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

      <div className="column-right">
        <h3>Your portfolio</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Date of trade</th>
              <th>Quantity</th>
              <th>Cost in USD</th>
              <th>Gas Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableHeadings}
            <tr>
              <strong>Totals</strong>
            </tr>
            <tr />
            <tr />
            <tr>
              Total expenses: <strong>${sumCostUSD().toLocaleString()}</strong>
            </tr>
            <tr>Current portfolio value: {null}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
