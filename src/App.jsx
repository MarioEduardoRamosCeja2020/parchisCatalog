
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

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const CART_KEY = "parchis3d_cart";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);
    return parsed ?? fallback;
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return fallback;
  }
}

function normalizeProduct(product) {
  const categories = {
    dados: "Dados",
    marcos: "Marcos",
    fichas: "Fichas",
  };

  const category = String(product.category || "dados").toLowerCase();

  return {
    ...product,
    id: product.id,
    category: categories[category] || product.category || "Dados",
    price: Number(product.price) || 0,
    stock: Number(product.stock) || 0,
    active: product.active !== false,
    featured: Boolean(product.featured),
    image: product.image_url || product.image || "",
  };
}

function productPayload(product) {
  return {
    name: String(product.name || "").trim(),
    description: String(product.description || ""),
    price: Number(product.price) || 0,
    category: String(product.category || "Dados").toLowerCase(),
    stock: Number(product.stock) || 0,
    active: product.active !== false,
    featured: Boolean(product.featured),
    color: product.color || null,
    badge: product.badge || null,
  };
}


async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  const text = await response.text();
  let result = null;

  if (text) {
    try {
      result = JSON.parse(text);
    } catch {
      result = text;
    }
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      `Error HTTP ${response.status}`;

    throw new Error(
      Array.isArray(message) ? message.join(", ") : message
    );
  }

  return result;
}
function App() {
  const [products, setProducts] = useState(() =>
    readStorage("parchis3d_products", productsSeed)
  );

  const [cart, setCart] = useState(() =>
    readStorage(CART_KEY, [])
  );

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const data = await apiRequest("/products");

        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió una lista de productos.");
        }

        if (!cancelled) {
          setProducts(data.map(normalizeProduct));
          setApiError("");
        }
      } catch (error) {
        console.error("Error cargando productos:", error);

        if (!cancelled) {
          setApiError(
            `No se pudo conectar con el servidor: ${error.message}`
          );
        }
      } finally {
        if (!cancelled) setLoadingProducts(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("No se pudo guardar el carrito:", error);
    }
  }, [cart]);

  const activeProducts = useMemo(
    () => products.filter((product) => product && product.active !== false),
    [products]
  );

  const addToCart = (product, amount = 1) => {
    if (!product) return;

    const stock = Math.max(0, Number(product.stock) || 0);
    if (stock <= 0) return;

    const quantity = Math.max(1, Number(amount) || 1);

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return currentCart.map((item) =>
          String(item.id) !== String(product.id)
            ? item
            : {
                ...item,
                stock,
                quantity: Math.min(
                  stock,
                  Number(item.quantity) + quantity
                ),
              }
        );
      }

      return [
        ...currentCart,
        { ...product, quantity: Math.min(stock, quantity) },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => String(item.id) !== String(id))
    );
  };

  const changeCartQuantity = (id, newQuantity) => {
    const quantity = Number(newQuantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (String(item.id) !== String(id)) return item;

          const product = products.find(
            (p) => String(p.id) === String(id)
          );

          const maxStock = Math.max(
            0,
            Number(product?.stock ?? item.stock ?? 0)
          );

          if (maxStock <= 0) return null;

          return {
            ...item,
            stock: maxStock,
            quantity: Math.min(maxStock, Math.floor(quantity)),
          };
        })
        .filter(Boolean)
        .filter((item) => item.quantity > 0)
    );
  };


const saveProduct = async (product) => {
  try {
    const exists = products.some(
      (item) => String(item.id) === String(product.id)
    );

    const fields = productPayload(product);
    const body = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        body.append(key, String(value));
      }
    });

    // Solo enviamos un archivo cuando el usuario eligió uno nuevo.
    if (product.image instanceof File) {
      body.append("image", product.image);
    }

    const result = await apiRequest(
      exists ? `/products/${product.id}` : "/products",
      {
        method: exists ? "PATCH" : "POST",
        body,
      }
    );

    const savedProduct = normalizeProduct(result);

    setProducts((current) => {
      const alreadyExists = current.some(
        (item) => String(item.id) === String(savedProduct.id)
      );

      return alreadyExists
        ? current.map((item) =>
            String(item.id) === String(savedProduct.id)
              ? savedProduct
              : item
          )
        : [savedProduct, ...current];
    });

    setApiError("");
    return true;
  } catch (error) {
    console.error("Error guardando producto:", error);
    window.alert(`No se pudo guardar el producto.\n${error.message}`);
    return false;
  }
};
  const deleteProduct = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) {
      return;
    }

    try {
      await apiRequest(`/products/${id}`, { method: "DELETE" });

      setProducts((current) =>
        current.filter((product) => String(product.id) !== String(id))
      );

      setCart((current) =>
        current.filter((item) => String(item.id) !== String(id))
      );
    } catch (error) {
      console.error("Error eliminando producto:", error);
      window.alert(`No se pudo eliminar el producto.\n${error.message}`);
    }
  };

  const updateProduct = async (id, changes) => {
    const currentProduct = products.find(
      (product) => String(product.id) === String(id)
    );

    if (!currentProduct) return;

    try {
      const result = await apiRequest(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...changes,
          ...(changes.category
            ? { category: String(changes.category).toLowerCase() }
            : {}),
        }),
      });

      const updatedProduct = normalizeProduct(result);

      setProducts((current) =>
        current.map((product) =>
          String(product.id) === String(id) ? updatedProduct : product
        )
      );

      setApiError("");
    } catch (error) {
      console.error("Error actualizando producto:", error);
      window.alert(`No se pudo actualizar el producto.\n${error.message}`);
    }
  };

  const toggleProduct = (id) => {
    const product = products.find(
      (item) => String(item.id) === String(id)
    );

    if (product) {
      updateProduct(id, { active: product.active === false });
    }
  };

  const toggleFeatured = (id) => {
    const product = products.find(
      (item) => String(item.id) === String(id)
    );

    if (product) {
      updateProduct(id, { featured: !product.featured });
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="stars-layer" />

      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-icon">🎲</span>
          <span>
            <strong>
              PARCHÍS <em>3D</em>
            </strong>
            <small>Diseños que brillan</small>
          </span>
        </Link>

        <nav className="main-nav">
          <Link to="/">Catálogo</Link>

          <Link
            to="/"
            onClick={() => {
              setTimeout(() => {
                document.getElementById("productos")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 50);
            }}
          >
            Colección
          </Link>

          <Link to="/admin">Administración</Link>
        </nav>

        <div className="header-actions" />
      </header>

      {apiError && (
        <div
          role="alert"
          style={{
            margin: "12px auto",
            maxWidth: "1100px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fff0f0",
            color: "#9b1c1c",
          }}
        >
          {apiError}
        </div>
      )}

      {loadingProducts && (
        <p style={{ textAlign: "center", padding: "16px" }}>
          Cargando catálogo...
        </p>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Catalog
              products={activeProducts}
              cart={cart}
              onAddToCart={addToCart}
              onChangeQuantity={changeCartQuantity}
              onRemoveFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              onSaveProduct={saveProduct}
              onDeleteProduct={deleteProduct}
              onToggleProduct={toggleProduct}
              onToggleFeatured={toggleFeatured}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <div>
          🎲 <strong>PARCHÍS 3D</strong>
        </div>
        <span>Diseños que hacen diferente cada partida.</span>
        <span>© 2026 Parchís 3D</span>
      </footer>
    </div>
  );
}

export default App;