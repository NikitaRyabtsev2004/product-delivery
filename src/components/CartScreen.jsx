import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const CartScreen = ({ navigateTo }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, checkout } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1);
      setMessage('Промокод применен (10% скидка)');
    } else {
      setMessage('Неверный промокод');
    }
  };

  const total = getCartTotal();
  const discountedTotal = total - (total * discount);

  const handleCheckout = async () => {
    const result = await checkout();
    if (result.success) {
      navigateTo('profile');
    } else {
      setMessage(result.message || 'Ошибка при оформлении заказа');
    }
  };

  return (
    <div className="screen cart-screen">
      <div className="header">
        <div className="icon" onClick={() => navigateTo('catalog')}>←</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="icon" onClick={() => navigateTo('profile')}>👤</div>
          <div className="icon" onClick={() => navigateTo('cart')}>🛒</div>
        </div>
      </div>
      
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            Корзина пуста
          </div>
        ) : (
          cartItems.map(item => (
            <CartItem 
              key={item.id}
              item={item}
              onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <>
          <div className="promo-code">
            <input 
              type="text" 
              placeholder="Промокод" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Применить</button>
          </div>
          
          {message && <div style={{ textAlign: 'center', color: '#4CAF50' }}>{message}</div>}
          
          <div className="cart-total">
            Итого: {discountedTotal} ₽
            {discount > 0 && (
              <span style={{ 
                fontSize: '14px', 
                color: '#4CAF50',
                display: 'block'
              }}>
                Скидка {discount * 100}% применена
              </span>
            )}
          </div>
          
          <button 
            className="btn" 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
};

export default CartScreen;