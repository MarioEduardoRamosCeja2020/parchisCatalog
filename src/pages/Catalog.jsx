import { useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";
import ProductDetails from "../components/ProductDetails";
import CartDrawer from "../components/CartDrawer";
import Dice3D from "../components/Dice3D";

function Catalog({
  products,
  cart,
  onAddToCart,
  onChangeQuantity,
  onRemoveFromCart,
}) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Todos");

  const [sort, setSort] =
    useState("popular");

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const [cartOpen, setCartOpen] =
    useState(false);

  const filteredProducts =
    useMemo(() => {
      let result = products.filter(
        (product) => {
          const text =
            `${product.name} ${product.description} ${product.category}`.toLowerCase();

          const matchesSearch =
            text.includes(
              search.toLowerCase()
            );

          const matchesCategory =
            category === "Todos" ||
            product.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );

      if (sort === "price-low") {
        result.sort(
          (a, b) =>
            Number(a.price) -
            Number(b.price)
        );
      }

      if (sort === "price-high") {
        result.sort(
          (a, b) =>
            Number(b.price) -
            Number(a.price)
        );
      }

      if (sort === "popular") {
        result.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );
      }

      return result;
    }, [
      products,
      search,
      category,
      sort,
    ]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const cartItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  return (
    <>
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="hero-kicker">
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
              Más que un juego,
              una colección.
              <br />
              Encuentra diseños
              únicos para
              transformar tu mesa
              de Parchís.
            </p>

            <div className="hero-buttons">
              <button
                className="button button-primary"
                onClick={() =>
                  document
                    .getElementById(
                      "productos"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                Explorar colección
                →
              </button>

              <button
                className="button button-secondary"
                onClick={() =>
                  setCategory(
                    "Dados"
                  )
                }
              >
                ✦ Ver dados
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>
                  {products.length}+
                </strong>
                <span>
                  diseños
                </span>
              </div>

              <div>
                <strong>
                  3D
                </strong>
                <span>
                  experiencia
                </span>
              </div>

              <div>
                <strong>
                  ✦
                </strong>
                <span>
                  edición especial
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-orbit orbit-three" />

            <div className="hero-spark spark-one">
              ✦
            </div>

            <div className="hero-spark spark-two">
              ✧
            </div>

            <div className="hero-spark spark-three">
              ✦
            </div>

            <Dice3D />

            <div className="hero-feature-card">
              <span>
                PRODUCTO DESTACADO
              </span>

              <strong>
                Dados Inferno
              </strong>

              <b>
                $95 MXN
              </b>
            </div>
          </div>
        </section>

        <section
          className="catalog-section"
          id="productos"
        >
          <div className="section-heading">
            <div>
              <span>
                DESCUBRE TU ESTILO
              </span>

              <h2>
                La colección
              </h2>
            </div>

            <p>
              Diseños creados para
              que cada partida
              tenga una personalidad
              diferente.
            </p>
          </div>

          <div className="filters-bar">
            <div className="search-box">
              <span>⌕</span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Buscar dados, marcos..."
              />

              {search && (
                <button
                  onClick={() =>
                    setSearch("")
                  }
                >
                  ×
                </button>
              )}
            </div>

            <div className="category-tabs">
              {[
                "Todos",
                "Dados",
                "Marcos",
                "Fichas",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    category ===
                    item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(
                      item
                    )
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(event) =>
                setSort(
                  event.target
                    .value
                )
              }
            >
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

            <button
              className="cart-top-button"
              onClick={() =>
                setCartOpen(true)
              }
            >
              🛒
              <span>
                {cartItems}
              </span>
            </button>
          </div>

          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <div className="sidebar-title">
                <span>
                  FILTROS
                </span>

                <strong>
                  Explora
                </strong>
              </div>

              <div className="sidebar-group">
                <label>
                  Categoría
                </label>

                {[
                  [
                    "Todos",
                    "◈",
                  ],
                  [
                    "Dados",
                    "⚄",
                  ],
                  [
                    "Marcos",
                    "▣",
                  ],
                ].map(
                  ([item, icon]) => (
                    <button
                      key={item}
                      className={
                        category ===
                        item
                          ? "sidebar-active"
                          : ""
                      }
                      onClick={() =>
                        setCategory(
                          item
                        )
                      }
                    >
                      <span>
                        {icon}
                      </span>

                      {item}
                    </button>
                  )
                )}
              </div>

              <div className="sidebar-promo">
                <span>
                  ✦
                </span>

                <strong>
                  Personaliza
                  <br />
                  tu mesa
                </strong>

                <p>
                  Combina tus
                  dados favoritos
                  con nuestros
                  marcos.
                </p>

                <button
                  onClick={() =>
                    setCategory(
                      "Marcos"
                    )
                  }
                >
                  Ver marcos →
                </button>
              </div>
            </aside>

            <div className="products-area">
              <div className="results-header">
                <span>
                  {filteredProducts.length}{" "}
                  productos
                </span>

                {(search ||
                  category !==
                    "Todos") && (
                  <button
                    onClick={() => {
                      setSearch(
                        ""
                      );
                      setCategory(
                        "Todos"
                      );
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>

              {filteredProducts.length ===
              0 ? (
                <div className="no-results">
                  <div>
                    ✦
                  </div>

                  <h3>
                    No encontramos
                    productos
                  </h3>

                  <p>
                    Prueba con otro
                    nombre o categoría.
                  </p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                        onSelect={
                          openProduct
                        }
                        onAddToCart={
                          onAddToCart
                        }
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
            <span>
              UNA NUEVA EXPERIENCIA
            </span>

            <h2>
              Diseños que
              <br />
              <em>
                brillan contigo.
              </em>
            </h2>

            <p>
              Explora cada detalle,
              combina estilos y crea
              una mesa completamente
              tuya.
            </p>
          </div>

          <div className="experience-cards">
            <div>
              <strong>
                360°
              </strong>

              <span>
                Vista de producto
              </span>
            </div>

            <div>
              <strong>
                3D
              </strong>

              <span>
                Diseños inmersivos
              </span>
            </div>

            <div>
              <strong>
                ∞
              </strong>

              <span>
                Combinaciones
              </span>
            </div>
          </div>
        </section>
      </main>

      <ProductDetails
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onClose={() =>
          setSelectedProduct(null)
        }
        onAdd={onAddToCart}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() =>
            setCartOpen(false)
          }
          onRemove={
            onRemoveFromCart
          }
          onChangeQuantity={
            onChangeQuantity
          }
        />
      )}
    </>
  );
}

export default Catalog;
