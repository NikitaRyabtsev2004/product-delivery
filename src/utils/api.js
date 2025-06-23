const API_BASE_URL = 'http://90.156.168.142:3001/api';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка сети' };
  }
};

export const register = async (email, password, name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка сети' };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newPassword })
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка сети' };
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка загрузки продуктов' };
  }
};

export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка загрузки продукта' };
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка загрузки категорий' };
  }
};

export const createOrder = async (userId, items) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, items })
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка создания заказа' };
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${userId}`);
    return await response.json();
  } catch (error) {
    return { success: false, message: 'Ошибка загрузки заказов' };
  }
};