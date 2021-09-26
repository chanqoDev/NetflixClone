import React from "react";
import "./App.css";
//import the row, file dir
import Row from "./Row"; // this should pull in the compo we created
import requests from "./requests";

function App() {
  return (
    <div className="App">
      <h1> Hey christian lets test that is running netflix clone locally. </h1>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    </div>
  );
}

export default App;
