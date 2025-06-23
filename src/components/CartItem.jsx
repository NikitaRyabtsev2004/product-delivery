import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">{item.emoji}</div>
      <div className="cart-item-info">
        <div>{item.name}</div>
        <div>{item.price} ₽{item.category === 'Молочные' ? '' : '/кг'}</div>
        <div className="cart-item-controls">
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity} {item.category === 'Молочные' ? 'шт' : 'кг'}</span>
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.quantity + 1)}
          >
            +
          </button>
          <button 
            style={{ 
              marginLeft: '10px', 
              color: 'red', 
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}
            onClick={onRemove}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;