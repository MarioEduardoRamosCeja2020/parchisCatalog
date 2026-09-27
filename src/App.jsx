import { useMemo, useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import "./index.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Todos" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const addToCart = (product, amount = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  product.stock,
                  item.quantity + amount
                ),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: amount,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const changeQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.stock,
                newQuantity
              ),
            }
          : item
      )
    );
  };

  const cartItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      <header className="header">
        <div className="logo">
          <div className="logo-icon">🎲</div>

          <div>
            <strong>
              PARCHÍS <span>3D</span>
            </strong>
            <small>Visualiza. Personaliza. Juega.</small>
          </div>
        </div>

        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#dados">Dados</a>
          <a href="#marcos">Marcos</a>
          <a href="#colecciones">Colecciones</a>
        </nav>

        <div className="header-actions">
          <button aria-label="Buscar">⌕</button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Carrito"
          >
            🛒
            {cartItems > 0 && (
              <span>{cartItems}</span>
            )}
          </button>

          <button aria-label="Perfil">◉</button>
        </div>
      </header>

      <main>
        <section className="hero" id="catalogo">
          <div className="hero-content">
            <span className="hero-tag">
              ✦ COLECCIÓN 2026
            </span>

            <h1>
              Toca.
              <br />
              <span>Gira.</span>
              <br />
              Descubre.
            </h1>

            <p>
              Más que un juego, una colección.
              <br />
              Encuentra diseños únicos para transformar
              tu mesa de Parchís.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() =>
                  document
                    .getElementById("productos")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explorar colección →
              </button>

              <button className="secondary-button">
                ✦ Ver destacados
              </button>
            </div>
          </div>

          <div className="hero-product">
            <div className="hero-ring ring-one" />
            <div className="hero-ring ring-two" />

            <div className="floating-dice dice-one">
              🎲
            </div>

            <div className="floating-dice dice-two">
              🎲
            </div>

            <div className="hero-dice">
              <div className="dice-face">
                <span>⚫</span>
                <span>⚫</span>
                <span>⚫</span>
                <span>⚫</span>
                <span>⚫</span>
              </div>
            </div>

            <div className="hero-info">
              <span>PRODUCTO DESTACADO</span>
              <strong>Dados Inferno</strong>
              <b>$95 MXN</b>
            </div>
          </div>
        </section>

        <section className="catalog-section" id="productos">
          <div className="section-heading">
            <div>
              <span>DESCUBRE TU ESTILO</span>
              <h2>La colección</h2>
            </div>

            <p>
              Diseños creados para que cada partida
              tenga una personalidad diferente.
            </p>
          </div>

          <div className="filters">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Buscar dados, marcos..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}
            </div>

            <div className="category-buttons">
              {["Todos", "Dados", "Marcos"].map(
                (item) => (
                  <button
                    key={item}
                    className={
                      category === item
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCategory(item)
                    }
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <select defaultValue="popular">
              <option value="popular">
                Más populares
              </option>
              <option value="price-low">
                Menor precio
              </option>
              <option value="price-high">
                Mayor precio
              </option>
            </select>
          </div>

          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <div className="sidebar-title">
                <span>FILTROS</span>
                <strong>Explora</strong>
              </div>

              <div className="sidebar-group">
                <label>Categoría</label>

                <button
                  className={
                    category === "Todos"
                      ? "sidebar-active"
                      : ""
                  }
                  onClick={() =>
                    setCategory("Todos")
                  }
                >
                  <span>◈</span>
                  Todos
                </button>

                <button
                  className={
                    category === "Dados"
                      ? "sidebar-active"
                      : ""
                  }
                  onClick={() =>
                    setCategory("Dados")
                  }
                >
                  <span>⚄</span>
                  Dados
                </button>

                <button
                  className={
                    category === "Marcos"
                      ? "sidebar-active"
                      : ""
                  }
                  onClick={() =>
                    setCategory("Marcos")
                  }
                >
                  <span>▣</span>
                  Marcos
                </button>
              </div>

              <div className="sidebar-group">
                <label>Disponibilidad</label>

                <div className="check-option">
                  <input type="checkbox" />
                  <span>En existencia</span>
                </div>

                <div className="check-option">
                  <input type="checkbox" />
                  <span>Edición especial</span>
                </div>
              </div>

              <div className="sidebar-promo">
                <span>✦</span>
                <strong>
                  Personaliza
                  <br />
                  tu mesa
                </strong>

                <p>
                  Combina tus dados favoritos
                  con nuestros marcos.
                </p>

                <button>
                  Crear combinación →
                </button>
              </div>
            </aside>

            <div className="products-area">
              <div className="results-header">
                <span>
                  {filteredProducts.length} productos
                </span>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("Todos");
                  }}
                >
                  Limpiar filtros
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <div>⌕</div>
                  <h3>No encontramos productos</h3>
                  <p>
                    Prueba con otro nombre o categoría.
                  </p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={openProduct}
                        onAddToCart={addToCart}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="experience-section">
          <div>
            <span>UNA NUEVA EXPERIENCIA</span>

            <h2>
              Diseños que
              <br />
              <em>giran contigo.</em>
            </h2>

            <p>
              Explora cada detalle, combina estilos
              y crea una mesa que sea completamente tuya.
            </p>

            <button>Descubrir colecciones →</button>
          </div>

          <div className="experience-cards">
            <div>
              <strong>360°</strong>
              <span>Vista de producto</span>
            </div>

            <div>
              <strong>3D</strong>
              <span>Diseños inmersivos</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Combinaciones</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">
          🎲 <strong>PARCHÍS 3D</strong>
        </div>

        <span>
          Diseños que hacen diferente cada partida.
        </span>

        <span>© 2026 Parchís 3D</span>
      </footer>

      <ProductDetails
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onChangeQuantity={changeQuantity}
        />
      )}
    </div>
  );
}

export default App;