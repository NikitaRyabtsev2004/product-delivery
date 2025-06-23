import React from 'react';

const OrderItem = ({ order }) => {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Доставлен':
        return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
      case 'В обработке':
        return { backgroundColor: '#fff8e1', color: '#ff8f00' };
      case 'Отменен':
        return { backgroundColor: '#ffebee', color: '#c62828' };
      default:
        return { backgroundColor: '#e3f2fd', color: '#1976d2' };
    }
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="order-item">
      <div className="order-date">{order.date}</div>
      <div>{order.items.length} товар(ов) ({totalItems} {totalItems === 1 ? 'шт' : 'шт'})</div>
      <div className="order-status" style={getStatusStyle(order.status)}>
        {order.status}
      </div>
      <div style={{ marginTop: '5px', fontWeight: 'bold' }}>
        Итого: {order.total} ₽
      </div>
    </div>
  );
};

export default OrderItem;