import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AuthScreen from './components/AuthScreen';
import { AuthContext } from './context/AuthContext';
const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockResetPassword = jest.fn();

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{
      user: null,
      isAuthenticated: false,
      loading: false,
      login: mockLogin,
      register: mockRegister,
      resetPassword: mockResetPassword,
      logout: jest.fn()
    }}>
      {children}
    </AuthContext.Provider>
  );
};

describe('AuthScreen Component Tests', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockReset();
    mockRegister.mockReset();
    mockResetPassword.mockReset();
  });

  const renderAuthScreen = () => {
    return render(
      <MockAuthProvider>
        <AuthScreen navigateTo={mockNavigate} />
      </MockAuthProvider>
    );
  };

  test('1. Рендеринг формы входа по умолчанию', () => {
    renderAuthScreen();
    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  test('2. Переключение между входом и регистрацией', () => {
    renderAuthScreen();
    
    fireEvent.click(screen.getByText('Зарегистрироваться'));
    expect(screen.getByText('Зарегистрируйтесь')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Войти'));
    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();
  });

  test('3. Отображение формы сброса пароля', () => {
    renderAuthScreen();
    
    fireEvent.click(screen.getByText('Забыли пароль?'));
    expect(screen.getByText('Сброс пароля')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Новый пароль')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Назад'));
    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();
  });

  test('4. Успешный вход', async () => {
    mockLogin.mockResolvedValue({ success: true });
    renderAuthScreen();
    
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Пароль'), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByText('Войти'));
    });
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockNavigate).toHaveBeenCalledWith('catalog');
  });

  test('5. Ошибка входа', async () => {
    mockLogin.mockResolvedValue({ success: false, message: 'Ошибка входа' });
    renderAuthScreen();
    
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Пароль'), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByText('Войти'));
    });
    
    expect(mockLogin).toHaveBeenCalled();
    expect(await screen.findByText('Ошибка входа')).toBeInTheDocument();
  });

  test('6. Успешная регистрация', async () => {
    mockRegister.mockResolvedValue({ success: true });
    renderAuthScreen();
    
    await act(async () => {
      fireEvent.click(screen.getByText('Зарегистрироваться'));
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Пароль'), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
        target: { value: 'Test User' }
      });
      fireEvent.click(screen.getByText('Зарегистрироваться'));
    });
    
    expect(mockRegister).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      'Test User'
    );
    expect(mockNavigate).toHaveBeenCalledWith('catalog');
  });

  test('7. Сброс пароля', async () => {
    mockResetPassword.mockResolvedValue({ success: true });
    renderAuthScreen();
    
    await act(async () => {
      fireEvent.click(screen.getByText('Забыли пароль?'));
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Новый пароль'), {
        target: { value: 'newpassword123' }
      });
      fireEvent.click(screen.getByText('Сменить пароль'));
    });
    
    expect(mockResetPassword).toHaveBeenCalledWith(
      'test@example.com',
      'newpassword123'
    );
    expect(await screen.findByText('Пароль успешно изменен. Теперь вы можете войти.')).toBeInTheDocument();
  });

  test('8. Состояние загрузки при отправке формы', async () => {
    let resolveLogin;
    mockLogin.mockImplementation(() => new Promise((resolve) => {
      resolveLogin = resolve;
    }));
    
    renderAuthScreen();
    
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('Пароль'), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByText('Войти'));
    });
    
    expect(mockLogin).toHaveBeenCalled();
    await act(async () => {
      resolveLogin({ success: true });
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('catalog');
  });
});
