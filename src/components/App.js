import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Portfolio from "./Portfolio";
import TrackerContainer from "./TrackerContainer";
import WatchList from "./WatchList";
import Footer from "./Footer";

function App() {
  const [coinList, setCoinList] = useState([]);

  return (
    <>
      <Header />
      <Nav coinList={coinList} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <TrackerContainer coinList={coinList} setCoinList={setCoinList} />
          }
        />
        <Route
          exact
          path="/portfolio"
          element={<Portfolio coinList={coinList} />}
        />
      </Routes>
    </>
  );
}

export default App;
