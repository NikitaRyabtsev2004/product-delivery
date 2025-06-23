import React from 'react';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  return (
    <div 
      className="product-card" 
      onClick={onClick}
    >
      <div className="product-image">{product.emoji}</div>
      <div className="product-info">
        <div>{product.name}</div>
        <div className="product-price">{product.price} ₽{product.category === 'Молочные' ? '' : '/кг'}</div>
      </div>
    </div>
  );
};

export default ProductCard;