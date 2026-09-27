import { useState } from "react";

function ProductCard({ product, onSelect, onAddToCart }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article
      className="product-card"
      style={{ "--product-color": product.color }}
    >
      <div className="product-image-wrapper" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://loremflickr.com/900/900/boardgame?lock=999";
          }}
        />

        <span className="product-badge">{product.badge}</span>

        <button
          className={`favorite-button ${favorite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setFavorite(!favorite);
          }}
          aria-label="Agregar a favoritos"
        >
          {favorite ? "♥" : "♡"}
        </button>

        <div className="image-overlay">
          <span>Ver producto</span>
        </div>
      </div>

      <div className="product-content">
        <div className="product-category">{product.category}</div>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-footer">
          <div>
            <strong>${product.price}</strong>
            <small> MXN</small>
          </div>

          <span className="stock">
            ● {product.stock} disponibles
          </span>
        </div>

        <button
          className="add-button"
          onClick={() => onAddToCart(product)}
        >
          <span>＋</span>
          Agregar
        </button>
      </div>
    </article>
  );
}

export default ProductCard;