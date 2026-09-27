function ProductDetails({ product, quantity, setQuantity, onClose, onAdd }) {
  if (!product) return null;

  const decrease = () => {
    setQuantity((value) => Math.max(1, value - 1));
  };

  const increase = () => {
    setQuantity((value) =>
      Math.min(product.stock, value + 1)
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src =
                "https://loremflickr.com/900/900/boardgame?lock=999";
            }}
          />
        </div>

        <div className="modal-info">
          <span className="modal-category">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <div className="modal-price">
            ${product.price}
            <small> MXN</small>
          </div>

          <p>{product.description}</p>

          <div className="modal-stock">
            <span>●</span>
            {product.stock} piezas disponibles
          </div>

          <div className="quantity-container">
            <span>Cantidad</span>

            <div className="quantity-control">
              <button onClick={decrease}>−</button>
              <strong>{quantity}</strong>
              <button onClick={increase}>＋</button>
            </div>
          </div>

          <button
            className="modal-cart-button"
            onClick={() => {
              onAdd(product, quantity);
              onClose();
            }}
          >
            🛒 Agregar al carrito
          </button>

          <div className="product-features">
            <div>
              <span>✦</span>
              Diseño exclusivo
            </div>

            <div>
              <span>◈</span>
              Alta calidad
            </div>

            <div>
              <span>✓</span>
              Stock disponible
            </div>

            <div>
              <span>↗</span>
              Envíos nacionales
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;