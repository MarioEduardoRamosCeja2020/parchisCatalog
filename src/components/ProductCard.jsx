import { useState } from "react";

function ProductCard({
  product,
  onSelect,
  onAddToCart,
}) {
  const [added, setAdded] =
    useState(false);

  const stock =
    Number(product.stock) || 0;

  const handleAdd = (event) => {
    event.stopPropagation();

    if (stock <= 0) return;

    onAddToCart(product, 1);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <article
      className="product-card"
      style={{
        "--product-color":
          product.color ||
          "#ff167d",
      }}
    >
      <div
        className="product-image-wrapper"
        onClick={() =>
          onSelect(product)
        }
      >
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

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className="favorite-button"
          onClick={(event) =>
            event.stopPropagation()
          }
          aria-label="Favorito"
        >
          ♡
        </button>

        <div className="image-overlay">
          <span>
            Ver producto
          </span>
        </div>
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>
          {product.description}
        </p>

        <div className="product-footer">
          <strong>
            $
            {Number(
              product.price
            ).toLocaleString(
              "es-MX"
            )}
          </strong>

          <small>MXN</small>

          <span className="stock">
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
          {stock <= 0
            ? "Agotado"
            : added
            ? "✓ Agregado"
            : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
