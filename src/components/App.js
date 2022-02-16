import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import TrackerContainer from "./TrackerContainer";
import WatchList from "./WatchList";
import Footer from "./Footer";
import { Chart } from "react-chartjs-2";
import { Route, Routes, Switch, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Nav />
      {/* <Chart /> */}
      {/* <Switch> */}
      {/* <Route exact path="/"> */}
      <TrackerContainer />
      {/* </Route> */}
      {/* </Switch> */}
    </>
  );
}

export default App;
