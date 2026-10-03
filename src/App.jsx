import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import productsSeed from "./data/products";

import "./App.css";

import Catalog from "./pages/Catalog";
import Admin from "./pages/Admin";

const PRODUCTS_KEY = "parchis3d_products";
const CART_KEY = "parchis3d_cart";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return parsed;
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return fallback;
  }
}

function App() {
  const [products, setProducts] = useState(() => {
    const saved = readStorage(
      PRODUCTS_KEY,
      null
    );

    return Array.isArray(saved)
      ? saved
      : productsSeed;
  });

  const [cart, setCart] = useState(() => {
    const saved = readStorage(
      CART_KEY,
      []
    );

    return Array.isArray(saved)
      ? saved
      : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
      );
    } catch (error) {
      console.error(
        "No se pudieron guardar los productos:",
        error
      );
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "No se pudo guardar el carrito:",
        error
      );
    }
  }, [cart]);

  const activeProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product &&
        product.active !== false
    );
  }, [products]);

  const addToCart = (
    product,
    amount = 1
  ) => {
    if (!product) return;

    const stock = Math.max(
      0,
      Number(product.stock) || 0
    );

    if (stock <= 0) {
      return;
    }

    const quantity = Math.max(
      1,
      Number(amount) || 1
    );

    setCart((currentCart) => {
      const existing =
        currentCart.find(
          (item) =>
            item.id === product.id
        );

      if (existing) {
        return currentCart.map(
          (item) => {
            if (
              item.id !== product.id
            ) {
              return item;
            }

            return {
              ...item,
              stock,
              quantity: Math.min(
                stock,
                Number(
                  item.quantity
                ) + quantity
              ),
            };
          }
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: Math.min(
            stock,
            quantity
          ),
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const changeCartQuantity = (
    id,
    newQuantity
  ) => {
    const quantity = Number(
      newQuantity
    );

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const product =
            products.find(
              (p) => p.id === id
            );

          const maxStock = Math.max(
            0,
            Number(
              product?.stock ??
                item.stock ??
                0
            )
          );

          if (maxStock <= 0) {
            return null;
          }

          return {
            ...item,
            stock: maxStock,
            quantity: Math.min(
              maxStock,
              Math.floor(quantity)
            ),
          };
        })
        .filter(Boolean)
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const saveProduct = (product) => {
    if (!product) return;

    setProducts(
      (currentProducts) => {
        const exists =
          currentProducts.some(
            (item) =>
              item.id === product.id
          );

        if (exists) {
          return currentProducts.map(
            (item) =>
              item.id === product.id
                ? product
                : item
          );
        }

        return [
          ...currentProducts,
          product,
        ];
      }
    );
  };

  const deleteProduct = (id) => {
    const confirmed =
      window.confirm(
        "¿Seguro que deseas eliminar este producto?"
      );

    if (!confirmed) return;

    setProducts(
      (currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== id
        )
    );

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const toggleProduct = (id) => {
    setProducts(
      (currentProducts) =>
        currentProducts.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  active:
                    product.active ===
                    false,
                }
              : product
        )
    );
  };

  const toggleFeatured = (id) => {
    setProducts(
      (currentProducts) =>
        currentProducts.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  featured:
                    !product.featured,
                }
              : product
        )
    );
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="stars-layer" />

      <header className="site-header">
        <Link
          to="/"
          className="brand"
        >
          <span className="brand-icon">
            🎲
          </span>

          <span>
            <strong>
              PARCHÍS{" "}
              <em>3D</em>
            </strong>

            <small>
              Diseños que brillan
            </small>
          </span>
        </Link>

        <nav className="main-nav">
          <Link to="/">
            Catálogo
          </Link>

          <Link
            to="/"
            onClick={() => {
              setTimeout(() => {
                document
                  .getElementById(
                    "productos"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 50);
            }}
          >
            Colección
          </Link>

          <Link to="/admin">
            Administración
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            to="/admin"
            className="header-admin"
          >
            ⚙ <span>Admin</span>
          </Link>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Catalog
              products={activeProducts}
              cart={cart}
              onAddToCart={addToCart}
              onChangeQuantity={
                changeCartQuantity
              }
              onRemoveFromCart={
                removeFromCart
              }
            />
          }
        />

        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              onSaveProduct={
                saveProduct
              }
              onDeleteProduct={
                deleteProduct
              }
              onToggleProduct={
                toggleProduct
              }
              onToggleFeatured={
                toggleFeatured
              }
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>

      <footer className="site-footer">
        <div>
          🎲{" "}
          <strong>
            PARCHÍS 3D
          </strong>
        </div>

        <span>
          Diseños que hacen diferente
          cada partida.
        </span>

        <span>
          © 2026 Parchís 3D
        </span>
      </footer>
    </div>
  );
}

export default App;
