import React, { useEffect, useState } from "react";
import "./Loader.css";

const quotes = [
  "Good things take time — please wait!",
  "Loading your dashboard... Excellence in progress!",
  "Patience is the key to success!",
  "Just a moment — setting up your community data!",
  "Fetching residents, vehicles, and visitors — almost there!"
];

function Loader() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote when the loader mounts
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading Application...</p>
      <p className="loading-quote">“{quote}”</p>
    </div>
  );
}

export default Loader;