import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Portfolio from "./Portfolio";
import Favorites from "./Favorites";
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
          path="/portfolio"
          element={<Portfolio coinList={coinList} />}
        />
        {/* <Route
          exact
          path="/favorites"
          element={<Favorites coinList={coinList} />}
        /> */}
        <Route
          path="/*"
          element={
            <TrackerContainer coinList={coinList} setCoinList={setCoinList} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
