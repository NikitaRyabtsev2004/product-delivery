import React, { useState, useEffect, useContext } from 'react';
import { getProduct, getProducts } from '../utils/api';
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';

const ProductScreen = ({ productId, navigateTo }) => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProduct(productId);
        if (productResponse.success) {
          setProduct(productResponse.product);
          
          const productsResponse = await getProducts();
          if (productsResponse.success) {
            const similar = productsResponse.products
              .filter(p => p.category === productResponse.product.category && p.id !== productResponse.product.id)
              .slice(0, 2);
            setSimilarProducts(similar);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="screen product-screen">
        <div className="header">
          <div className="icon" onClick={() => navigateTo('catalog')}>←</div>
          <div className="icon" onClick={() => navigateTo('cart')}>🛒</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="screen product-screen">
      <div className="header">
        <div className="icon" onClick={() => navigateTo('catalog')}>←</div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="icon" onClick={() => navigateTo('profile')}>👤</div>
          <div className="icon" onClick={() => navigateTo('cart')}>🛒</div>
        </div>
      </div>
      
      <div className="product-image">{product.emoji}</div>
      
      <h1 className="product-title">{product.name}</h1>
      <div className="product-description">
        {product.description}
      </div>
      
      <div className="add-to-cart">
        <div className="product-price">{product.price} ₽{product.category === 'Молочные' ? '' : '/кг'}</div>
        <button 
          className="btn" 
          onClick={() => {
            addToCart(product);
            navigateTo('cart');
          }}
        >
          В корзину
        </button>
      </div>
      
      {similarProducts.length > 0 && (
        <div className="similar-products">
          <h3>Похожие товары</h3>
          <div className="products">
            {similarProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => navigateTo('product', product.id)}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;