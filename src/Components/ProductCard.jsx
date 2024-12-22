import React from 'react';
import './ProductCard.css';

// Function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are 0-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  const formattedTime = `${day}/${month}/${year}, time: ${
    hours % 12 || 12
  }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;

  return formattedTime;
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" data-aos="fade-up" >
      <img src={product.imageUrl} alt={product.itemName} className="product-img" />
      <div className="product-info">
        <h3 className="product-name">{product.itemName}</h3>
        {/* <p className="product-details">{product.details || 'No details available'}</p> */}
        <p className="product-brand">Brand : {product.brand}</p>
        <p className="product-color">Color : {product.color}</p>
        <p className="product-location">Found at : {product.foundPlace}</p>
        <p className="product-date">Found on : {formatTimestamp(product.timestamp)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
