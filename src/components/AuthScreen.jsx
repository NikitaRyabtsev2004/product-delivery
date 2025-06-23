import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthScreen = ({ navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login, register, resetPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (showResetPassword) {
      const result = await resetPassword(email, newPassword);
      if (result.success) {
        setMessage('Пароль успешно изменен. Теперь вы можете войти.');
        setShowResetPassword(false);
        setNewPassword('');
      } else {
        setMessage(result.message || 'Ошибка при смене пароля');
      }
      return;
    }

    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        navigateTo('catalog');
      } else {
        setMessage(result.message || 'Ошибка при входе');
      }
    } else {
      const result = await register(email, password, name);
      if (result.success) {
        navigateTo('catalog');
      } else {
        setMessage(result.message || 'Ошибка при регистрации');
      }
    }
  };

  return (
    <div className="screen auth-screen">
      <div className="header">
        <div className="logo">FoodMarket</div>
      </div>
      
      {showResetPassword ? (
        <>
          <h2>Сброс пароля</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Новый пароль" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <button type="submit" className="btn">Сменить пароль</button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                setShowResetPassword(false);
                setMessage('');
              }}
            >
              Назад
            </button>
            {message && <div className="forgot-password">{message}</div>}
          </form>
        </>
      ) : (
        <>
          <h2>{isLogin ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
              {!isLogin && (
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
            </div>
            <button type="submit" className="btn">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
              }}
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
            {isLogin && (
              <div 
                className="forgot-password" 
                onClick={() => {
                  setShowResetPassword(true);
                  setMessage('');
                }}
              >
                Забыли пароль?
              </div>
            )}
            {message && <div className="forgot-password">{message}</div>}
          </form>
          
          <div className="social-auth">
            <div className="social-icon">G</div>
            <div className="social-icon">F</div>
            <div className="social-icon">V</div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthScreen;