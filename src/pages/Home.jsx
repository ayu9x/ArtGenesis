import React, { useState } from "react";
import logo from "./Images/Logo.png";
import RareNFT from "./Images/RareNFT.jpg";
import LiveAuction from "./Images/LiveAuction.jpg";
import NFTGallery from "./NFTGallery";
import Hackatao from "./Images/Hackatao.jpg";
import Tobi from "./Images/Tobi.jpg";
import Reeza from "./Images/Reeza.jpg";
import Mike from "./Images/Mike.jpg";
import { GiFire } from "react-icons/gi";
import "./Home.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard">
      

      {/* Main Content */}
      <main className="content">
        <header className="header">
        <div>
          <img className="logo" src={logo} alt="Logo" />
        </div>
          <input
            type="text"
            className="search"
            placeholder="Search items, collections, and users"
          />
          <div className="actions">
            <h3>Home</h3>
            <h3>Marketplace</h3>
            <h3>AboutUs</h3>
            <button className="icon">🌞</button>
            <button className="icon">🔔</button>
            <div className="profile">Log In</div>
            <button className="menu-button" onClick={toggleMenu}>
              {isMenuOpen ? "Close Menu" : "Open Menu"}
            </button>
          </div>
        </header>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>Dashboard</li>
              <li>Market</li>
              <li>Active Bids</li>
              <li>Favorites</li>
              <li>My Portfolio</li>
              <li>Wallet</li>
            </ul>
          </div>
        )}

        <div className="main-section">
          {/* Banner */}
          <section className="banner">
            <div className="banner-right">
              <img className="Rare" src={RareNFT} alt="Rare NFT" />
              <div className="banner-left">
                <h1>
                  Collect Your <br /> Rare <span>NFT</span> Here
                </h1>
                <button className="explore-btn">Explore Now</button>
              </div>
            </div>
          </section>
          <section className="top-creator">
            <div className="top-creators">
              <div className="header">
                <h2>Top Creator <GiFire /></h2>
                <a href="#">See more</a>
              </div>
              <ul className="creators-list">
                <li>
                  <img src={Hackatao} alt="Creator 1" />
                  <div>
                    <p>Hackatao</p>
                    <span>@hackatao</span>
                  </div>
                  <button className="follow-btn">Following</button>
                </li>
                <li>
                  <img src={Mike} alt="Creator 2" />
                  <div>
                    <p>Mike Parisella</p>
                    <span>@slimesunday</span>
                  </div>
                  <button className="follow-btn">Following</button>
                </li>
                <li>
                  <img src={Reeza} alt="Creator 3" />
                  <div>
                    <p>Reza Afshar</p>
                    <span>@rezaa_afsharr</span>
                  </div>
                  <button className="follow-btn">Following</button>
                </li>
                <li>
                  <img src={Tobi} alt="Creator 4" />
                  <div>
                    <p> Tobi Schnorpfeil</p>
                    <span>@tschnorpfei</span>
                  </div>
                  <button className="follow-btn">Following</button>
                </li>
              </ul>
            </div>
          </section>


          {/* Trending NFTs */}
          <NFTGallery />

          {/* Live Auction */}
          <section className="live-auction">
            <div className="auction-card">
              <img src={LiveAuction} alt="Live Auction" />
              <div className="Live">
                <h1>
                  Live Auction
                </h1>
                <button className="live-button">Explore Now</button>
              </div>
            </div>
          </section>
        </div>
        <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
        {/* Footer */}
        <footer className="footer">
          <div className="section">
            <h3>Stay in the loop</h3>
            <p>Subscribe to our mailing list to stay updated on the latest feature releases, NFT drops, and expert tips
              for navigating ArtGenesis.</p>
            <input type="email" placeholder="Your email address" />
            <button id="Signup">Sign up</button>
          </div>
          <div className="section-button">
            <button className="section-buttons">Contact Support</button>
          </div>
          <div className="social-section">
            
            <div className="social-icons">
            <h3>Join the community:</h3>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Discord</a>
              <a href="#">Reddit</a>
              <a href="#">YouTube</a>
              <a href="#">TikTok</a>
              <a href="#">Email</a>
            </div>
          </div>
          
          <div className="columns">
            <div className="column">
              <h3>ArtGenesis</h3>
              <p>The premier global platform for trading crypto collectibles and NFTs. Explore, buy, and sell unique
                digital assets in a one-of-a-kind marketplace.</p>
            </div>
            <div className="column">
              <h3>Marketplace</h3>
              <ul>
                <li><a href="#">Art</a></li>
                <li><a href="#">Gaming</a></li>
                <li><a href="#">Memberships</a></li>
                <li><a href="#">PFPs</a></li>
                <li><a href="#">Photography</a></li>
                <li><a href="#">Music</a></li>
              </ul>
            </div>
            <div className="column">
              <h3>My Account</h3>
              <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Favorites</a></li>
                <li><a href="#">Watchlist</a></li>
                <li><a href="#">My Collections</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </div>
            <div className="column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
            <div className="column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="column">
              <h3>Learn</h3>
              <ul>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Developers</a></li>
                <li><a href="#">Directory</a></li>
                <li><a href="#">Browse Categories</a></li>
              </ul>
            </div>
          </div>

          <footer className="footer-end">
            <h4>&copy; 2025 ArtGenesis. All rights reserved.</h4>
          </footer>
        </footer>
      </main>
    </div>
  );
};

export default Home;
