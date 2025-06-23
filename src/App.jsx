import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import AuthScreen from './components/AuthScreen';
import CatalogScreen from './components/CatalogScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import ProfileScreen from './components/ProfileScreen';
import './styles/App.css';
import TestRunnerScreen from './components/TestRunnerScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [currentProductId, setCurrentProductId] = useState(null);
  const { isAuthenticated, loading } = useContext(AuthContext);

  const navigateTo = (screen, productId = null) => {
    if (productId) setCurrentProductId(productId);
    setCurrentScreen(screen);
  };

  useEffect(() => {
    if (!loading && isAuthenticated && currentScreen === 'auth') {
      setCurrentScreen('catalog');
    }
    if (!loading && !isAuthenticated && currentScreen !== 'auth') {
      setCurrentScreen('auth');
    }
  }, [isAuthenticated, loading, currentScreen]);

  if (loading) {
    return <div className="app-container">Загрузка...</div>;
  }

  return (
    <div className="app-container">
      {/* <TestRunnerScreen/> */}
      {currentScreen === 'auth' && <AuthScreen navigateTo={navigateTo} />}
      {currentScreen === 'catalog' && <CatalogScreen navigateTo={navigateTo} />}
      {currentScreen === 'product' && (
        <ProductScreen 
          productId={currentProductId} 
          navigateTo={navigateTo} 
        />
      )}
      {currentScreen === 'cart' && <CartScreen navigateTo={navigateTo} />}
      {currentScreen === 'profile' && <ProfileScreen navigateTo={navigateTo} />}
    </div>
  );
}

export default App;