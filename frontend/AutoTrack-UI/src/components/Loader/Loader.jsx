import React, { useEffect, useState } from "react";
import "./Loader.css";

const quotes = [
  "Good things take time — please wait!",
  "Loading data... excellence in progress!",
  "Patience is the key to smooth performance!",
  "Fetching residents, vehicles & visitors — almost there!",
  "Preparing dashboard data for you!"
];

function Loader() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="inline-loader">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
      <p className="loading-quote">“{quote}”</p>
    </div>
  );
}

export default Loader;
