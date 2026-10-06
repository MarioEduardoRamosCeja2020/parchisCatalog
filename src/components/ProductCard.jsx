import { useState } from "react";

function ProductCard({
  product,
  onSelect,
  onAddToCart,
}) {
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const stock = Number(product.stock) || 0;

  const handleAdd = (event) => {
    event.stopPropagation();

    if (stock <= 0) return;

    onAddToCart(product, 1);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1400);
  };

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setFavorite((current) => !current);
  };

  return (
    <article
      className="product-card"
      style={{
        "--product-color": product.color || "#ff167d",
      }}
    >
      <div
        className="product-image-wrapper"
        onClick={() => onSelect(product)}
      >
        <div className="product-glow" />

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src =
              "https://loremflickr.com/800/800/dice?lock=999";
          }}
        />

        <div className="image-shine" />

        <div className="floating-stars">
          <span>✦</span>
          <span>✧</span>
          <span>⋆</span>
        </div>

        {product.badge && (
          <span className="product-badge">
            <span>✦</span>
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={`favorite-button ${
            favorite ? "is-favorite" : ""
          }`}
          onClick={toggleFavorite}
          aria-label={
            favorite
              ? "Quitar de favoritos"
              : "Agregar a favoritos"
          }
        >
          {favorite ? "♥" : "♡"}
        </button>

        <div className="image-overlay">
          <span>
            Ver producto
            <b>→</b>
          </span>
        </div>
      </div>

      <div className="product-content">
        <div className="product-heading">
          <span className="product-category">
            {product.category}
          </span>

          {product.featured && (
            <span className="featured-mini">
              ★ Destacado
            </span>
          )}
        </div>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <div className="price-box">
            <strong>
              $
              {Number(product.price).toLocaleString(
                "es-MX"
              )}
            </strong>

            <small>MXN</small>
          </div>

          <span
            className={`stock ${
              stock <= 3 && stock > 0
                ? "stock-warning"
                : ""
            }`}
          >
            {stock > 0
              ? `${stock} disponibles`
              : "Agotado"}
          </span>
        </div>

        <button
          type="button"
          className={`add-button ${
            added ? "added" : ""
          }`}
          disabled={stock <= 0}
          onClick={handleAdd}
        >
          <span>
            {stock <= 0
              ? "Agotado"
              : added
              ? "✓ Agregado"
              : "Agregar al carrito"}
          </span>

          {stock > 0 && !added && <b>+</b>}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
