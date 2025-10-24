import React from "react";
import "./Loader.css";

const Loader = () => {
 const quotes = [
  "Good things take time — please wait!",
  "Loading data... excellence in progress!",
  "Patience is the key to smooth performance!",
  "Fetching residents, vehicles & visitors — almost there!",
  "Preparing dashboard data for you!"
];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-quote">{randomQuote}</p>
    </div>
  );
};

export default Loader;
