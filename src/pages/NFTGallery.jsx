import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NFTGallery.css";

const NFTCard = ({ image, title, floorPrice, totalVolume }) => {
  return (
    <div className="collection-card">
      <img src={image} alt={title} />
      <h3>
        {title} <span className="verified">✔</span>
      </h3>
      <div className="details">
        <div>
          <p>Floor</p>
          <p>{floorPrice}</p>
        </div>
        <div>
          <p>Total volume</p>
          <p>{totalVolume}</p>
        </div>
      </div>
    </div>
  );
};

const NFTGallery = () => {
  const nftData = [
    {
      image: "azuki-elementals.jpg",
      title: "Azuki Elementals",
      floorPrice: "0.29 ETH",
      totalVolume: "66K ETH",
    },
    {
      image: "skyborne-genesis.jpg",
      title: "Skyborne - Genesis Immortals",
      floorPrice: "0.04 ETH",
      totalVolume: "1,236 ETH",
    },
    {
      image: "cool-cats.jpg",
      title: "Cool Cats",
      floorPrice: "0.52 ETH",
      totalVolume: "155K ETH",
    },
    {
      image: "nifty-island.jpg",
      title: "Nifty Island: Legendary P...",
      floorPrice: "0.19 ETH",
      totalVolume: "2,317 ETH",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="nft-gallery">
      <h3>Featured NFTs</h3>
      <Slider {...sliderSettings} className="nft-slider">
        {nftData.map((nft, index) => (
          <NFTCard
            key={index}
            image={nft.image}
            title={nft.title}
            floorPrice={nft.floorPrice}
            totalVolume={nft.totalVolume}
          />
        ))}
      </Slider>
    </section>
  );
};

export default NFTGallery;