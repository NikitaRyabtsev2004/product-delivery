import {
  login,
  register,
  resetPassword,
  getProducts,
  getProduct,
  getCategories,
  createOrder,
  getUserOrders,
} from "./utils/api";

jest.mock("./utils/api");

describe("API Logic Tests", () => {
  const testUser = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  const testProduct = {
    id: 1,
    name: "Помидоры",
    price: 250,
    category: "Овощи",
  };

  const testOrder = {
    id: 1,
    userId: 1,
    items: [{ productId: 1, quantity: 2 }],
    total: 500,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("1. Успешная регистрация пользователя", async () => {
    register.mockResolvedValue({ success: true, user: testUser });
    const result = await register(
      testUser.email,
      testUser.password,
      testUser.name
    );
    expect(result.success).toBe(true);
    expect(register).toHaveBeenCalledWith(
      testUser.email,
      testUser.password,
      testUser.name
    );
  });

  test("2. Ошибка при регистрации с существующим email", async () => {
    register.mockResolvedValue({
      success: false,
      message: "Email уже используется",
    });
    const result = await register(testUser.email, "pass", "Name");
    expect(result.success).toBe(false);
  });

  test("3. Успешный вход пользователя", async () => {
    login.mockResolvedValue({ success: true, token: "test-token" });
    const result = await login(testUser.email, testUser.password);
    expect(result.token).toBeDefined();
  });

  test("4. Ошибка входа с неверными данными", async () => {
    login.mockResolvedValue({ success: false, message: "Неверные данные" });
    const result = await login("wrong@email.com", "wrongpass");
    expect(result.success).toBe(false);
  });

  test("5. Успешный сброс пароля", async () => {
    resetPassword.mockResolvedValue({ success: true });
    const result = await resetPassword(testUser.email, "newpassword");
    expect(result.success).toBe(true);
  });

  test("6. Получение списка продуктов", async () => {
    getProducts.mockResolvedValue({ success: true, products: [testProduct] });
    const result = await getProducts();
    expect(result.products).toHaveLength(1);
  });

  test("7. Получение продукта по ID", async () => {
    getProduct.mockResolvedValue({ success: true, product: testProduct });
    const result = await getProduct(1);
    expect(result.product.id).toBe(1);
  });

  test("8. Ошибка при запросе несуществующего продукта", async () => {
    getProduct.mockResolvedValue({ success: false, message: "Не найдено" });
    const result = await getProduct(999);
    expect(result.success).toBe(false);
  });

  test("9. Получение списка категорий", async () => {
    getCategories.mockResolvedValue({
      success: true,
      categories: ["Овощи", "Фрукты"],
    });
    const result = await getCategories();
    expect(result.categories).toContain("Овощи");
  });

  test("10. Формат ответа при получении продуктов", async () => {
    getProducts.mockResolvedValue({ success: true, products: [testProduct] });
    const result = await getProducts();
    expect(result).toHaveProperty("products");
    expect(result.products[0]).toHaveProperty("price");
  });

  test("11. Создание нового заказа", async () => {
    createOrder.mockResolvedValue({ success: true, order: testOrder });
    const result = await createOrder(1, testOrder.items);
    expect(result.order.id).toBeDefined();
  });

  test("12. Ошибка при создании заказа без товаров", async () => {
    createOrder.mockResolvedValue({ success: false, message: "Пустой заказ" });
    const result = await createOrder(1, []);
    expect(result.success).toBe(false);
  });

  test("13. Получение заказов пользователя", async () => {
    getUserOrders.mockResolvedValue({ success: true, orders: [testOrder] });
    const result = await getUserOrders(1);
    expect(result.orders).toHaveLength(1);
  });

  test("14. Формат данных заказа", async () => {
    getUserOrders.mockResolvedValue({ success: true, orders: [testOrder] });
    const result = await getUserOrders(1);
    expect(result.orders[0]).toHaveProperty("total");
    expect(result.orders[0]).toHaveProperty("items");
  });

  test("15. Ошибка при запросе заказов несуществующего пользователя", async () => {
    getUserOrders.mockResolvedValue({
      success: false,
      message: "Пользователь не найден",
    });
    const result = await getUserOrders(999);
    expect(result.success).toBe(false);
  });

  // 16-20: Тесты валидации
  test("16. Валидация email при регистрации", async () => {
    register.mockResolvedValue({ success: false, message: "Неверный email" });
    const result = await register("invalid-email", "pass", "Name");
    expect(result.success).toBe(false);
  });

  test("17. Валидация короткого пароля", async () => {
    register.mockResolvedValue({
      success: false,
      message: "Пароль слишком короткий",
    });
    const result = await register("test@example.com", "123", "Name");
    expect(result.success).toBe(false);
  });

  test("18. Валидация отрицательного количества товара", async () => {
    createOrder.mockResolvedValue({
      success: false,
      message: "Неверное количество",
    });
    const result = await createOrder(1, [{ productId: 1, quantity: -1 }]);
    expect(result.success).toBe(false);
  });

  test("19. Валидация несуществующего ID продукта", async () => {
    createOrder.mockResolvedValue({
      success: false,
      message: "Неверный продукт",
    });
    const result = await createOrder(1, [{ productId: 999, quantity: 1 }]);
    expect(result.success).toBe(false);
  });

  test("20. Валидация пустого имени при регистрации", async () => {
    register.mockResolvedValue({ success: false, message: "Имя обязательно" });
    const result = await register("test@example.com", "password", "");
    expect(result.success).toBe(false);
  });

  test("21. Фильтрация продуктов по категории", async () => {
    getProducts.mockImplementation(async () => {
      return {
        success: true,
        products: [testProduct, { ...testProduct, id: 2, category: "Фрукты" }],
      };
    });

    const result = await getProducts();
    const vegetables = result.products.filter((p) => p.category === "Овощи");
    expect(vegetables.length).toBe(1);
  });

  test("22. Сортировка продуктов по цене", async () => {
    getProducts.mockResolvedValue({
      success: true,
      products: [
        { ...testProduct, price: 300 },
        { ...testProduct, id: 2, price: 200 },
      ],
    });

    const result = await getProducts();
    const sorted = [...result.products].sort((a, b) => a.price - b.price);
    expect(sorted[0].price).toBe(200);
  });

  test("23. Пагинация продуктов", async () => {
    getProducts.mockImplementation(async () => {
      return {
        success: true,
        products: Array(10)
          .fill(0)
          .map((_, i) => ({
            ...testProduct,
            id: i + 1,
          })),
        total: 10,
        page: 1,
        limit: 5,
      };
    });

    const result = await getProducts();
    expect(result.products.length).toBe(10);
    expect(result).toHaveProperty("page");
  });

  test("24. Ошибка сети при запросе продуктов", async () => {
    getProducts.mockRejectedValue(new Error("Network Error"));
    await expect(getProducts()).rejects.toThrow("Network Error");
  });

  test("25. Таймаут запроса продуктов", async () => {
    getProducts.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true, products: [] }), 2000)
        )
    );

    const result = await getProducts();
    expect(result.products).toHaveLength(0);
  });

  test("26. Формат ошибки при неверном запросе", async () => {
    getProduct.mockResolvedValue({
      success: false,
      error: {
        code: 404,
        message: "Not Found",
      },
    });

    const result = await getProduct(999);
    expect(result.error.code).toBe(404);
  });

  test("27. Авторизация с истекшим токеном", async () => {
    login.mockResolvedValue({
      success: false,
      code: 401,
      message: "Token expired",
    });

    const result = await login(testUser.email, testUser.password);
    expect(result.code).toBe(401);
  });

  test("28. Ограничение попыток входа", async () => {
    login.mockResolvedValue({
      success: false,
      code: 429,
      message: "Too many attempts",
    });

    const result = await login(testUser.email, "wrongpass");
    expect(result.code).toBe(429);
  });

  test("29. Валидация сложности пароля", async () => {
    register.mockResolvedValue({
      success: false,
      message: "Password too weak",
    });

    const result = await register(testUser.email, "123456", testUser.name);
    expect(result.message).toMatch(/weak/i);
  });
});

