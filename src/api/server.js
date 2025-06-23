const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const DB_PATH = path.join(__dirname, "db.json");
const PORT = 3001;

class MockServer {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.db = this.loadDB();
    this.setupRoutes();
  }

  loadDB() {
    try {
      const data = fs.readFileSync(DB_PATH, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error loading DB:", err);
      return {
        products: [],
        users: [],
        orders: [],
        categories: [],
      };
    }
  }

  saveDB() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.db, null, 2));
      return true;
    } catch (err) {
      console.error("Error saving DB:", err);
      return false;
    }
  }

  setupRoutes() {
    this.app.post("/api/login", (req, res) => {
      const { email, password } = req.body;
      const user = this.db.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            token: user.token,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Неверный email или пароль",
        });
      }
    });

    this.app.post("/api/register", (req, res) => {
      const { email, password, name } = req.body;
      const userExists = this.db.users.some((u) => u.email === email);

      if (userExists) {
        res.status(400).json({
          success: false,
          message: "Пользователь с таким email уже существует",
        });
        return;
      }

      const newUser = {
        id: this.db.users.length + 1,
        email,
        password,
        name,
        token: `mock-token-${Math.random().toString(36).substr(2, 9)}`,
      };

      this.db.users.push(newUser);
      this.saveDB();

      res.json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          token: newUser.token,
        },
      });
    });

    this.app.post("/api/reset-password", (req, res) => {
      const { email, newPassword } = req.body;
      const user = this.db.users.find((u) => u.email === email);

      if (user) {
        user.password = newPassword;
        this.saveDB();
        res.json({
          success: true,
          message: "Пароль успешно изменен",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Пользователь с таким email не найден",
        });
      }
    });

    this.app.get("/api/products", (req, res) => {
      res.json({
        success: true,
        products: this.db.products,
      });
    });

    this.app.get("/api/products/:id", (req, res) => {
      const product = this.db.products.find(
        (p) => p.id === parseInt(req.params.id)
      );
      if (product) {
        res.json({
          success: true,
          product,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Продукт не найден",
        });
      }
    });

    this.app.get("/api/categories", (req, res) => {
      res.json({
        success: true,
        categories: this.db.categories,
      });
    });

    this.app.post("/api/orders", (req, res) => {
      const { userId, items } = req.body;
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const newOrder = {
        id: this.db.orders.length + 1,
        userId,
        date: new Date().toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        items,
        status: "В обработке",
        total,
      };

      this.db.orders.push(newOrder);
      this.saveDB();

      res.json({
        success: true,
        order: newOrder,
      });
    });

    this.app.get("/api/orders/:userId", (req, res) => {
      const orders = this.db.orders.filter(
        (o) => o.userId === parseInt(req.params.userId)
      );
      res.json({
        success: true,
        orders,
      });
    });

    this.app.listen(PORT, () => {
      console.log(`Mock server running on http://localhost:${PORT}`);
    });
  }
}

new MockServer();