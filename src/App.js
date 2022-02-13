import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import TrackerContainer from "./TrackerContainer";
import WatchList from "./WatchList";
// import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <TrackerContainer />
      <WatchList />
      {/* <Footer /> */}
    </>
  );
}

export default App;
