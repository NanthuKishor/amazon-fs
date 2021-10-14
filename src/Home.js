import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="https://m.media-amazon.com/images/I/71g6GkQj38L._SX3000_.jpg"
          alt="home.png"
        />

        <div className="home-row">
          <Product
            
            id="12345"
            title="SteelSeries Arctis 1 Wired Gaming Headset – Detachable Clearcast Microphone – Lightweight Steel-Reinforced Headband."
            price={49.23}
            rating={4}
            image="https://m.media-amazon.com/images/I/811tgMXfuxL._AC_UY218_.jpg"
          />
          <Product
            
            id="21345"
            title="Amazon Basics Wireless Keyboard-Quiet and Compact-US Layout (QWERTY)."
            price={21}
            rating={3}
            image="https://m.media-amazon.com/images/I/71e6gpxfb+L._AC_UY218_.jpg"
          />
        </div>
        <div className="home-row">
          <Product
            
            id="23145"
            title="Donerton Smart Watch, Fitness Tracker for Android Phones."
            price={37.99}
            rating={3}
            image="https://m.media-amazon.com/images/I/61QHRATj+vL._AC_UL320_.jpg"
          />
          <Product
            
            id="23415"
            title="Adidas Men's Lite Racer Adapt 4.0 Running Shoe."
            price={43.29}
            rating={5}
            image="https://m.media-amazon.com/images/I/81l5J1Rf11S._AC_UL320_.jpg"
          />
          <Product
            
            id="23451"
            title="Samsung Electronics Galaxy A12, 32GB Black."
            price={169}
            rating={5}
            image="https://m.media-amazon.com/images/I/91cMHXMo3OL._AC_UY218_.jpg"
          />
        </div>
        <div className="home-row">
          <Product
            
            id="22345"
            title="HP 15 Laptop, 11th Gen Intel Core i5-1135G7 Processor, 8 GB RAM, 256 GB SSD Storage, 15.6” Full HD IPS Display, Windows 10 Home, HP Fast Charge, Lightweight Design (15-dy2021nr, 2020)."
            price={569}
            rating={5}
            image="https://m.media-amazon.com/images/I/81skV7BufjL._AC_UY218_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
