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
  const [coinQuantity, setCoinQuantity] = useState(0);
  const [totalCoinValue, setTotalCoinValue] = useState(0);

  const portfolioQuantities = {};
  const portfolioSummaryArr = [];

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
      <>
        <tr key={index + 1}>
          <td>{entry.coin.toUpperCase()}</td>
          <td>{entry.dateOfBuy}</td>
          <td>{entry.quantity}</td>
          <td>{entry.price.toLocaleString()}</td>
          <td>{!entry.gasCost ? "-" : entry.gasCost}</td>
        </tr>
        {/* <button>delete</button> */}
      </>
    );
  });

  //portfolio calculations

  //put total costs into array
  const totalCostUSD = portfolio.map((trade) => {
    return trade.price * trade.quantity;
  });

  //calculate sum of costs
  let sumPortfolio = 0;
  for (let i = 0; i < totalCostUSD.length; i++) {
    sumPortfolio += parseInt(totalCostUSD[i]);
  }
  // console.log(sumPortfolio);

  // console.log(coinList);
  console.log(portfolio);

  portfolio.forEach((trade) => {
    if (!portfolioQuantities[trade.coin]) {
      portfolioQuantities[trade.coin.toLowerCase()] = {
        coin: trade.coin,
        quantity: Number(trade.quantity),
      };
    } else {
      console.log(trade.coin);
      portfolioQuantities[trade.coin] = {
        coin: trade.coin,
        quantity:
          Number(trade.quantity) + portfolioQuantities[trade.coin].quantity,
      };
    }
    //loop over coinList and use find()

    const coinPrice = coinList.find((coin) => {
      if (coin.symbol.toLowerCase() === trade.coin) {
        portfolioQuantities[trade.coin]["current_price"] = coin.current_price;
      }
    });
  });

  for (let coin in portfolioQuantities) {
    portfolioSummaryArr.push(portfolioQuantities[coin]);
  }
  console.log(portfolioSummaryArr);

  // console.log("portfolioQuantities", portfolioQuantities);
  //populate portfolio summary table data

  const portfolioSummary = portfolioSummaryArr.map((coin) => {
    let totalValue = (coin.quantity * coin.current_price).toLocaleString();
    return (
      <tr key={coin.coin}>
        <td>{coin.coin.toUpperCase()}</td>
        <td>{coin.quantity}</td>
        <td>${totalValue}</td>
        <td>{Number(totalValue)}</td>
      </tr>
    );
  });

  // console.log(portfolioSummary);

  //set current portfolio value
  let totalPortfolioValue = 0;
  for (let coin in portfolioQuantities) {
    totalPortfolioValue +=
      portfolioQuantities[coin].quantity *
      portfolioQuantities[coin].current_price;
  }

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
        <h3>Portfolio summary</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Total Quantity</th>
              <th>Total Value</th>
              <th>Percentage of Holdings</th>
            </tr>
          </thead>
          <tbody>{portfolioSummary}</tbody>
        </table>

        <p>
          <strong>Total Investment:</strong> ${sumPortfolio.toLocaleString()}
        </p>
        <p>
          <strong>Current portfolio value:</strong> $
          {totalPortfolioValue.toLocaleString()}
        </p>
        <p>
          <strong>Net Profit:</strong> $
          {(totalPortfolioValue - sumPortfolio).toLocaleString()}
        </p>

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
          <tbody>{tableHeadings}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Portfolio;
