import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserOrders } from '../utils/api';
import OrderItem from './OrderItem';

const ProfileScreen = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('Мои заказы');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user && activeTab === 'Мои заказы') {
      const fetchOrders = async () => {
        try {
          const response = await getUserOrders(user.id);
          if (response.success) {
            setOrders(response.orders);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user, activeTab]);

  const handleLogout = () => {
    logout();
    navigateTo('auth');
  };

  return (
    <div className="screen profile-screen">
      <div className="header">
        <div className="logo">Профиль</div>
      </div>
      
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div>
          <div className="profile-name">{user?.name || 'Гость'}</div>
          <div className="profile-email">{user?.email || 'Не авторизован'}</div>
        </div>
      </div>
      
      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'Мои заказы' ? 'active' : ''}`}
          onClick={() => setActiveTab('Мои заказы')}
        >
          Мои заказы
        </div>
        <div 
          className={`tab ${activeTab === 'Настройки' ? 'active' : ''}`}
          onClick={() => setActiveTab('Настройки')}
        >
          Настройки
        </div>
        <div 
          className={`tab ${activeTab === 'Выход' ? 'active' : ''}`}
          onClick={handleLogout}
        >
          Выход
        </div>
      </div>
      
      {activeTab === 'Мои заказы' && (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>
          ) : orders.length > 0 ? (
            orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>Нет заказов</div>
          )}
        </div>
      )}
      
      {activeTab === 'Настройки' && (
        <div style={{ padding: '20px' }}>
          <h3>Настройки профиля</h3>
          <p>Здесь будут настройки вашего профиля</p>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;