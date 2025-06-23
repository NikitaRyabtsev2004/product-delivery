import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProductScreen from './components/ProductScreen';
import { CartContext } from './context/CartContext';
import * as api from './utils/api';

const mockAddToCart = jest.fn();

jest.mock('./utils/api', () => ({
  getProduct: jest.fn(),
  getProducts: jest.fn()
}));

const MockCartProvider = ({ children }) => {
  return (
    <CartContext.Provider value={{
      addToCart: mockAddToCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

describe('ProductScreen Component Tests', () => {
  const mockNavigate = jest.fn();
  const mockProductId = '1';
  
  const mockProduct = {
    id: '1',
    name: 'Яблоки',
    price: 100,
    category: 'Фрукты',
    emoji: '🍎',
    description: 'Свежие яблоки'
  };
  
  const mockSimilarProducts = [
    { id: '2', name: 'Груши', price: 120, category: 'Фрукты', emoji: '🍐' },
    { id: '3', name: 'Бананы', price: 80, category: 'Фрукты', emoji: '🍌' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddToCart.mockReset();
    api.getProduct.mockReset();
    api.getProducts.mockReset();
  });

  const renderProductScreen = (productId = mockProductId) => {
    return render(
      <MockCartProvider>
        <ProductScreen productId={productId} navigateTo={mockNavigate} />
      </MockCartProvider>
    );
  };

  test('1. Рендеринг состояния загрузки', () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: mockSimilarProducts });
    
    renderProductScreen();
    
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('🛒')).toBeInTheDocument();
  });

  test('2. Рендеринг деталей продукта', async () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: mockSimilarProducts });
    
    renderProductScreen();
    
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(screen.getByText('Яблоки')).toBeInTheDocument();
    expect(screen.getByText('100 ₽/кг')).toBeInTheDocument();
    expect(screen.getByText('Свежие яблоки')).toBeInTheDocument();
    expect(screen.getByText('В корзину')).toBeInTheDocument();
  });

  test('3. Рендеринг похожих продуктов', async () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: mockSimilarProducts });
    
    renderProductScreen();
    
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByText('Груши')).toBeInTheDocument();
    expect(screen.getByText('Бананы')).toBeInTheDocument();
    expect(screen.getByText('120 ₽/кг')).toBeInTheDocument();
    expect(screen.getByText('80 ₽/кг')).toBeInTheDocument();
  });

  test('4. Добавление продукта в корзину и переход в корзину', async () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: [] });
    
    renderProductScreen();
    
    await act(async () => {
      await Promise.resolve();
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('В корзину'));
    });
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockNavigate).toHaveBeenCalledWith('cart');
  });

  test('5. Навигация в каталог, профиль и корзину', async () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: [] });
    
    renderProductScreen();
    
    await act(async () => {
      await Promise.resolve();
    });
    
    const catalogIcon = screen.getByText('←');
    const profileIcon = screen.getByText('👤');
    const cartIcon = screen.getAllByText('🛒')[0];
    
    await act(async () => {
      fireEvent.click(catalogIcon);
      fireEvent.click(profileIcon);
      fireEvent.click(cartIcon);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('catalog');
    expect(mockNavigate).toHaveBeenCalledWith('profile');
    expect(mockNavigate).toHaveBeenCalledWith('cart');
  });

  test('6. Переход к похожему продукту', async () => {
    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });
    api.getProducts.mockResolvedValueOnce({ success: true, products: mockSimilarProducts });
    
    renderProductScreen();
    
    await act(async () => {
      await Promise.resolve();
    });
    
    const similarProductCard = screen.getByText('Груши');
    
    await act(async () => {
      fireEvent.click(similarProductCard);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('product', '2');
  });
});
