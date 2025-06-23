import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CartScreen from './components/CartScreen';
import { CartContext } from './context/CartContext';

const mockUpdateQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockGetCartTotal = jest.fn();
const mockCheckout = jest.fn();

const mockCartItems = [
  { id: 1, name: 'Яблоки', price: 100, quantity: 2, emoji: '🍎', category: 'Фрукты' },
  { id: 2, name: 'Молоко', price: 80, quantity: 1, emoji: '🥛', category: 'Молочные' }
];

const MockCartProvider = ({ children, cartItems = [] }) => {
  return (
    <CartContext.Provider value={{
      cartItems,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
      getCartTotal: mockGetCartTotal,
      checkout: mockCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
};

describe('CartScreen Component Tests', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateQuantity.mockReset();
    mockRemoveFromCart.mockReset();
    mockGetCartTotal.mockReset();
    mockCheckout.mockReset();
  });

  const renderCartScreen = (cartItems = []) => {
    return render(
      <MockCartProvider cartItems={cartItems}>
        <CartScreen navigateTo={mockNavigate} />
      </MockCartProvider>
    );
  };

  test('1. Рендеринг пустой корзины', () => {
    renderCartScreen();
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
    expect(screen.queryByText('Оформить заказ')).not.toBeInTheDocument();
  });

  test('2. Рендеринг элементов корзины', () => {
    mockGetCartTotal.mockReturnValue(280);
    renderCartScreen(mockCartItems);
    
    expect(screen.getByText('Яблоки')).toBeInTheDocument();
    expect(screen.getByText('Молоко')).toBeInTheDocument();
    expect(screen.getByText('100 ₽/кг')).toBeInTheDocument();
    expect(screen.getByText('80 ₽')).toBeInTheDocument();
    expect(screen.getByText('2 кг')).toBeInTheDocument();
    expect(screen.getByText('1 шт')).toBeInTheDocument();
    expect(screen.getByText('Итого: 280 ₽')).toBeInTheDocument();
  });

  test('3. Обновление количества товара', async () => {
    mockGetCartTotal.mockReturnValue(280);
    renderCartScreen(mockCartItems);
    
    const increaseButtons = screen.getAllByText('+');
    const decreaseButtons = screen.getAllByText('-');
    
    await act(async () => {
      fireEvent.click(increaseButtons[0]); 
      fireEvent.click(decreaseButtons[1]); 
    });
    
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(2, 0);
  });

  test('4. Удаление товара из корзины', async () => {
    mockGetCartTotal.mockReturnValue(280);
    renderCartScreen(mockCartItems);
    
    const removeButtons = screen.getAllByText('Удалить');
    
    await act(async () => {
      fireEvent.click(removeButtons[0]); 
    });
    
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test('5. Отображение общей суммы', () => {
    mockGetCartTotal.mockReturnValue(280);
    renderCartScreen(mockCartItems);
    
    expect(mockGetCartTotal).toHaveBeenCalled();
    expect(screen.getByText('Итого: 280 ₽')).toBeInTheDocument();
  });

  test('6. Успешное оформление заказа', async () => {
    mockGetCartTotal.mockReturnValue(280);
    mockCheckout.mockResolvedValue({ success: true, order: { id: 1 } });
    renderCartScreen(mockCartItems);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Оформить заказ'));
    });
    
    expect(mockCheckout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('profile');
  });

  test('7. Ошибка при оформлении заказа', async () => {
    mockGetCartTotal.mockReturnValue(280);
    mockCheckout.mockResolvedValue({ success: false, message: 'Ошибка заказа' });
    renderCartScreen(mockCartItems);
    
    await act(async () => {
      fireEvent.click(screen.getByText('Оформить заказ'));
    });
    
    expect(mockCheckout).toHaveBeenCalled();
    expect(await screen.findByText('Ошибка заказа')).toBeInTheDocument();
  });

  test('8. Навигация в каталог и профиль', async () => {
    mockGetCartTotal.mockReturnValue(280);
    renderCartScreen(mockCartItems);
    
    const catalogIcon = screen.getByText('←');
    const profileIcon = screen.getByText('👤');
    
    await act(async () => {
      fireEvent.click(catalogIcon);
      fireEvent.click(profileIcon);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('catalog');
    expect(mockNavigate).toHaveBeenCalledWith('profile');
  });
});
