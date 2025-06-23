export default {
  "apiLogic": {
    "name": "API Logic Tests",
    "file": "apiLogic.test.js",
    "tests": [
      {
        "name": "1. Успешная регистрация пользователя",
        "code": "test(\"1. Успешная регистрация пользователя\", async () => {\n    register.mockResolvedValue({ success: true, user: testUser });"
      },
      {
        "name": "2. Ошибка при регистрации с существующим email",
        "code": "test(\"2. Ошибка при регистрации с существующим email\", async () => {\n    register.mockResolvedValue({\n      success: false,\n      message: \"Email уже используется\",\n    });"
      },
      {
        "name": "3. Успешный вход пользователя",
        "code": "test(\"3. Успешный вход пользователя\", async () => {\n    login.mockResolvedValue({ success: true, token: \"test-token\" });"
      },
      {
        "name": "4. Ошибка входа с неверными данными",
        "code": "test(\"4. Ошибка входа с неверными данными\", async () => {\n    login.mockResolvedValue({ success: false, message: \"Неверные данные\" });"
      },
      {
        "name": "5. Успешный сброс пароля",
        "code": "test(\"5. Успешный сброс пароля\", async () => {\n    resetPassword.mockResolvedValue({ success: true });"
      },
      {
        "name": "6. Получение списка продуктов",
        "code": "test(\"6. Получение списка продуктов\", async () => {\n    getProducts.mockResolvedValue({ success: true, products: [testProduct] });"
      },
      {
        "name": "7. Получение продукта по ID",
        "code": "test(\"7. Получение продукта по ID\", async () => {\n    getProduct.mockResolvedValue({ success: true, product: testProduct });"
      },
      {
        "name": "8. Ошибка при запросе несуществующего продукта",
        "code": "test(\"8. Ошибка при запросе несуществующего продукта\", async () => {\n    getProduct.mockResolvedValue({ success: false, message: \"Не найдено\" });"
      },
      {
        "name": "9. Получение списка категорий",
        "code": "test(\"9. Получение списка категорий\", async () => {\n    getCategories.mockResolvedValue({\n      success: true,\n      categories: [\"Овощи\", \"Фрукты\"],\n    });"
      },
      {
        "name": "10. Формат ответа при получении продуктов",
        "code": "test(\"10. Формат ответа при получении продуктов\", async () => {\n    getProducts.mockResolvedValue({ success: true, products: [testProduct] });"
      },
      {
        "name": "11. Создание нового заказа",
        "code": "test(\"11. Создание нового заказа\", async () => {\n    createOrder.mockResolvedValue({ success: true, order: testOrder });"
      },
      {
        "name": "12. Ошибка при создании заказа без товаров",
        "code": "test(\"12. Ошибка при создании заказа без товаров\", async () => {\n    createOrder.mockResolvedValue({ success: false, message: \"Пустой заказ\" });"
      },
      {
        "name": "13. Получение заказов пользователя",
        "code": "test(\"13. Получение заказов пользователя\", async () => {\n    getUserOrders.mockResolvedValue({ success: true, orders: [testOrder] });"
      },
      {
        "name": "14. Формат данных заказа",
        "code": "test(\"14. Формат данных заказа\", async () => {\n    getUserOrders.mockResolvedValue({ success: true, orders: [testOrder] });"
      },
      {
        "name": "15. Ошибка при запросе заказов несуществующего пользователя",
        "code": "test(\"15. Ошибка при запросе заказов несуществующего пользователя\", async () => {\n    getUserOrders.mockResolvedValue({\n      success: false,\n      message: \"Пользователь не найден\",\n    });"
      },
      {
        "name": "16. Валидация email при регистрации",
        "code": "test(\"16. Валидация email при регистрации\", async () => {\n    register.mockResolvedValue({ success: false, message: \"Неверный email\" });"
      },
      {
        "name": "17. Валидация короткого пароля",
        "code": "test(\"17. Валидация короткого пароля\", async () => {\n    register.mockResolvedValue({\n      success: false,\n      message: \"Пароль слишком короткий\",\n    });"
      },
      {
        "name": "18. Валидация отрицательного количества товара",
        "code": "test(\"18. Валидация отрицательного количества товара\", async () => {\n    createOrder.mockResolvedValue({\n      success: false,\n      message: \"Неверное количество\",\n    });"
      },
      {
        "name": "19. Валидация несуществующего ID продукта",
        "code": "test(\"19. Валидация несуществующего ID продукта\", async () => {\n    createOrder.mockResolvedValue({\n      success: false,\n      message: \"Неверный продукт\",\n    });"
      },
      {
        "name": "20. Валидация пустого имени при регистрации",
        "code": "test(\"20. Валидация пустого имени при регистрации\", async () => {\n    register.mockResolvedValue({ success: false, message: \"Имя обязательно\" });"
      },
      {
        "name": "21. Фильтрация продуктов по категории",
        "code": "test(\"21. Фильтрация продуктов по категории\", async () => {\n    getProducts.mockImplementation(async () => {\n      return {\n        success: true,\n        products: [testProduct, { ...testProduct, id: 2, category: \"Фрукты\" }],\n      };\n    });"
      },
      {
        "name": "22. Сортировка продуктов по цене",
        "code": "test(\"22. Сортировка продуктов по цене\", async () => {\n    getProducts.mockResolvedValue({\n      success: true,\n      products: [\n        { ...testProduct, price: 300 },\n        { ...testProduct, id: 2, price: 200 },\n      ],\n    });"
      },
      {
        "name": "23. Пагинация продуктов",
        "code": "test(\"23. Пагинация продуктов\", async () => {\n    getProducts.mockImplementation(async () => {\n      return {\n        success: true,\n        products: Array(10)\n          .fill(0)\n          .map((_, i) => ({\n            ...testProduct,\n            id: i + 1,\n          })),\n        total: 10,\n        page: 1,\n        limit: 5,\n      };\n    });"
      },
      {
        "name": "24. Ошибка сети при запросе продуктов",
        "code": "test(\"24. Ошибка сети при запросе продуктов\", async () => {\n    getProducts.mockRejectedValue(new Error(\"Network Error\"));\n    await expect(getProducts()).rejects.toThrow(\"Network Error\");\n  });"
      },
      {
        "name": "25. Таймаут запроса продуктов",
        "code": "test(\"25. Таймаут запроса продуктов\", async () => {\n    getProducts.mockImplementation(\n      () =>\n        new Promise((resolve) =>\n          setTimeout(() => resolve({ success: true, products: [] }), 2000)\n        )\n    );\n\n    const result = await getProducts();\n    expect(result.products).toHaveLength(0);\n  });"
      },
      {
        "name": "26. Формат ошибки при неверном запросе",
        "code": "test(\"26. Формат ошибки при неверном запросе\", async () => {\n    getProduct.mockResolvedValue({\n      success: false,\n      error: {\n        code: 404,\n        message: \"Not Found\",\n      },\n    });"
      },
      {
        "name": "27. Авторизация с истекшим токеном",
        "code": "test(\"27. Авторизация с истекшим токеном\", async () => {\n    login.mockResolvedValue({\n      success: false,\n      code: 401,\n      message: \"Token expired\",\n    });"
      },
      {
        "name": "28. Ограничение попыток входа",
        "code": "test(\"28. Ограничение попыток входа\", async () => {\n    login.mockResolvedValue({\n      success: false,\n      code: 429,\n      message: \"Too many attempts\",\n    });"
      },
      {
        "name": "29. Валидация сложности пароля",
        "code": "test(\"29. Валидация сложности пароля\", async () => {\n    register.mockResolvedValue({\n      success: false,\n      message: \"Password too weak\",\n    });"
      }
    ]
  },
  "authScreen": {
    "name": "AuthScreen Component Tests",
    "file": "authScreen.test.js",
    "tests": [
      {
        "name": "1. Рендеринг формы входа по умолчанию",
        "code": "test('1. Рендеринг формы входа по умолчанию', () => {\n    renderAuthScreen();\n    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();\n    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();\n    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();\n  });"
      },
      {
        "name": "2. Переключение между входом и регистрацией",
        "code": "test('2. Переключение между входом и регистрацией', () => {\n    renderAuthScreen();\n    \n    fireEvent.click(screen.getByText('Зарегистрироваться'));\n    expect(screen.getByText('Зарегистрируйтесь')).toBeInTheDocument();\n    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();\n    \n    fireEvent.click(screen.getByText('Войти'));\n    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();\n  });"
      },
      {
        "name": "3. Отображение формы сброса пароля",
        "code": "test('3. Отображение формы сброса пароля', () => {\n    renderAuthScreen();\n    \n    fireEvent.click(screen.getByText('Забыли пароль?'));\n    expect(screen.getByText('Сброс пароля')).toBeInTheDocument();\n    expect(screen.getByPlaceholderText('Новый пароль')).toBeInTheDocument();\n    \n    fireEvent.click(screen.getByText('Назад'));\n    expect(screen.getByText('Войдите в аккаунт')).toBeInTheDocument();\n  });"
      },
      {
        "name": "4. Успешный вход",
        "code": "test('4. Успешный вход', async () => {\n    mockLogin.mockResolvedValue({ success: true });"
      },
      {
        "name": "5. Ошибка входа",
        "code": "test('5. Ошибка входа', async () => {\n    mockLogin.mockResolvedValue({ success: false, message: 'Ошибка входа' });"
      },
      {
        "name": "6. Успешная регистрация",
        "code": "test('6. Успешная регистрация', async () => {\n    mockRegister.mockResolvedValue({ success: true });"
      },
      {
        "name": "7. Сброс пароля",
        "code": "test('7. Сброс пароля', async () => {\n    mockResetPassword.mockResolvedValue({ success: true });"
      },
      {
        "name": "8. Состояние загрузки при отправке формы",
        "code": "test('8. Состояние загрузки при отправке формы', async () => {\n    let resolveLogin;\n    mockLogin.mockImplementation(() => new Promise((resolve) => {\n      resolveLogin = resolve;\n    }));\n    \n    renderAuthScreen();\n    \n    await act(async () => {\n      fireEvent.change(screen.getByPlaceholderText('Email'), {\n        target: { value: 'test@example.com' }\n      });"
      }
    ]
  },
  "CartScreen": {
    "name": "CartScreen Component Tests",
    "file": "CartScreen.test.js",
    "tests": [
      {
        "name": "1. Рендеринг пустой корзины",
        "code": "test('1. Рендеринг пустой корзины', () => {\n    renderCartScreen();\n    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();\n    expect(screen.queryByText('Оформить заказ')).not.toBeInTheDocument();\n  });"
      },
      {
        "name": "2. Рендеринг элементов корзины",
        "code": "test('2. Рендеринг элементов корзины', () => {\n    mockGetCartTotal.mockReturnValue(280);\n    renderCartScreen(mockCartItems);\n    \n    expect(screen.getByText('Яблоки')).toBeInTheDocument();\n    expect(screen.getByText('Молоко')).toBeInTheDocument();\n    expect(screen.getByText('100 ₽/кг')).toBeInTheDocument();\n    expect(screen.getByText('80 ₽')).toBeInTheDocument();\n    expect(screen.getByText('2 кг')).toBeInTheDocument();\n    expect(screen.getByText('1 шт')).toBeInTheDocument();\n    expect(screen.getByText('Итого: 280 ₽')).toBeInTheDocument();\n  });"
      },
      {
        "name": "3. Обновление количества товара",
        "code": "test('3. Обновление количества товара', async () => {\n    mockGetCartTotal.mockReturnValue(280);\n    renderCartScreen(mockCartItems);\n    \n    const increaseButtons = screen.getAllByText('+');\n    const decreaseButtons = screen.getAllByText('-');\n    \n    await act(async () => {\n      fireEvent.click(increaseButtons[0]); \n      fireEvent.click(decreaseButtons[1]); \n    });"
      },
      {
        "name": "4. Удаление товара из корзины",
        "code": "test('4. Удаление товара из корзины', async () => {\n    mockGetCartTotal.mockReturnValue(280);\n    renderCartScreen(mockCartItems);\n    \n    const removeButtons = screen.getAllByText('Удалить');\n    \n    await act(async () => {\n      fireEvent.click(removeButtons[0]); \n    });"
      },
      {
        "name": "5. Отображение общей суммы",
        "code": "test('5. Отображение общей суммы', () => {\n    mockGetCartTotal.mockReturnValue(280);\n    renderCartScreen(mockCartItems);\n    \n    expect(mockGetCartTotal).toHaveBeenCalled();\n    expect(screen.getByText('Итого: 280 ₽')).toBeInTheDocument();\n  });"
      },
      {
        "name": "6. Успешное оформление заказа",
        "code": "test('6. Успешное оформление заказа', async () => {\n    mockGetCartTotal.mockReturnValue(280);\n    mockCheckout.mockResolvedValue({ success: true, order: { id: 1 } });"
      },
      {
        "name": "7. Ошибка при оформлении заказа",
        "code": "test('7. Ошибка при оформлении заказа', async () => {\n    mockGetCartTotal.mockReturnValue(280);\n    mockCheckout.mockResolvedValue({ success: false, message: 'Ошибка заказа' });"
      },
      {
        "name": "8. Навигация в каталог и профиль",
        "code": "test('8. Навигация в каталог и профиль', async () => {\n    mockGetCartTotal.mockReturnValue(280);\n    renderCartScreen(mockCartItems);\n    \n    const catalogIcon = screen.getByText('←');\n    const profileIcon = screen.getByText('👤');\n    \n    await act(async () => {\n      fireEvent.click(catalogIcon);\n      fireEvent.click(profileIcon);\n    });"
      }
    ]
  },
  "ProductScreen": {
    "name": "ProductScreen Component Tests",
    "file": "ProductScreen.test.js",
    "tests": [
      {
        "name": "1. Рендеринг состояния загрузки",
        "code": "test('1. Рендеринг состояния загрузки', () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      },
      {
        "name": "2. Рендеринг деталей продукта",
        "code": "test('2. Рендеринг деталей продукта', async () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      },
      {
        "name": "3. Рендеринг похожих продуктов",
        "code": "test('3. Рендеринг похожих продуктов', async () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      },
      {
        "name": "4. Добавление продукта в корзину и переход в корзину",
        "code": "test('4. Добавление продукта в корзину и переход в корзину', async () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      },
      {
        "name": "5. Навигация в каталог, профиль и корзину",
        "code": "test('5. Навигация в каталог, профиль и корзину', async () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      },
      {
        "name": "6. Переход к похожему продукту",
        "code": "test('6. Переход к похожему продукту', async () => {\n    api.getProduct.mockResolvedValueOnce({ success: true, product: mockProduct });"
      }
    ]
  }
};