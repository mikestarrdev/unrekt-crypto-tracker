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
  const [currentTokenPrices, setCurrentTokenPrices] = useState({});

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
      coin: coin.toLowerCase(),
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
      <tr key={index}>
        <td>{entry.coin.toUpperCase()}</td>
        <td>{entry.dateOfBuy}</td>
        <td>{entry.quantity}</td>
        <td>${entry.price}</td>
        <td>{!entry.gasCost ? "-" : entry.gasCost}</td>
      </tr>
    );
  });

  //portfolio calculations

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
    return {};
  });

  //calculate current price
  //loop over portfolio. Create object with all tokens, add total quantity of holdings, and total current value of tokens (pulled in from a variable from parent scope)

  console.log("coinList: ", coinList);
  console.log("portfolio", portfolio);

  //create object where each key is a token. No duplicates

  function portfolioValueCalc() {
    //create object of tokens:quantity
    const portfolioQuantities = {};
    portfolio.forEach((trade) => {
      if (!portfolioQuantities[trade.coin]) {
        portfolioQuantities[trade.coin.toLowerCase()] = {
          quantity: Number(trade.quantity),
        };
      } else {
        portfolioQuantities[trade.coin] = {
          quantity:
            Number(trade.quantity) + portfolioQuantities[trade.coin].quantity,
        };
      }
      //loop over coinList and use find()

      const coinPrice = coinList.find((coin) => {
        if (coin.symbol.toLowerCase() === trade.coin) {
          console.log(coin.current_price);
          portfolioQuantities[trade.coin]["current_price"] = coin.current_price;
        }
      });
    });
    console.log("portfolioQuantities", portfolioQuantities);
  }

  portfolioValueCalc();

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
        <h3>Your Trades</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Date of trade</th>
              <th>Quantity</th>
              <th>Cost basis (USD)</th>
              <th>Gas Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableHeadings}
            <tr>
              <td>Totals</td>
            </tr>
            <tr />
            <tr />

            <tr>
              <td>
                <strong>Total expenses:</strong> $
                {sumCostUSD().toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Current portfolio value:</strong> {null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
