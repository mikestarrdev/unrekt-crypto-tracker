import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import TrackerContainer from "./TrackerContainer";
import WatchList from "./WatchList";
import Footer from "./Footer";
import { Route, Routes, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <TrackerContainer />
      <WatchList />
    </>
  );
}

export default App;
