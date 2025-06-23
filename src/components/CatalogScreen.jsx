import React, { useState, useEffect, useContext } from "react";
import { getProducts, getCategories } from "../utils/api";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

const CatalogScreen = ({ navigateTo }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        if (productsResponse.success) setProducts(productsResponse.products);
        if (categoriesResponse.success)
          setCategories(categoriesResponse.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Все" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="screen catalog-screen">
        <div className="header">
          <div className="logo">FoodMarket</div>
          <div className="icon" onClick={() => navigateTo("cart")}>
            🛒
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="screen catalog-screen">
      <div className="header">
        <div className="logo">FoodMarket</div>
        <div className="icon" onClick={() => navigateTo("catalog")}>
          ←
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <div className="icon" onClick={() => navigateTo("profile")}>
            👤
          </div>
          <div className="icon" onClick={() => navigateTo("cart")}>
            🛒
          </div>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск продуктов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map((category) => (
          <div
            key={category}
            className={`${
              selectedCategory === category ? "category active" : "category"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigateTo("product", product.id)}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Товары не найдены
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogScreen;
