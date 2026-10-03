function ProductDetails({
  product,
  quantity,
  setQuantity,
  onClose,
  onAdd,
}) {
  if (!product) {
    return null;
  }

  const stock =
    Number(product.stock) || 0;

  const total =
    Number(product.price) *
    quantity;

  const decrease = () => {
    setQuantity(
      Math.max(1, quantity - 1)
    );
  };

  const increase = () => {
    setQuantity(
      Math.min(stock, quantity + 1)
    );
  };

  const handleAdd = () => {
    onAdd(product, quantity);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="product-modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="modal-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src =
                "https://loremflickr.com/800/800/dice?lock=999";
            }}
          />
        </div>

        <div className="modal-info">
          <span className="modal-category">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <div className="modal-price">
            $
            {Number(
              product.price
            ).toLocaleString(
              "es-MX"
            )}
            <small> MXN</small>
          </div>

          <p>
            {product.description}
          </p>

          <div className="modal-stock">
            <span>●</span>

            {stock > 0
              ? `${stock} piezas disponibles`
              : "Producto agotado"}
          </div>

          {stock > 0 && (
            <>
              <div className="quantity-container">
                <span>
                  Cantidad
                </span>

                <div className="quantity-control">
                  <button
                    onClick={
                      decrease
                    }
                  >
                    −
                  </button>

                  <strong>
                    {quantity}
                  </strong>

                  <button
                    onClick={
                      increase
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="modal-cart-button"
                onClick={
                  handleAdd
                }
              >
                Agregar · $
                {total.toLocaleString(
                  "es-MX"
                )}
              </button>
            </>
          )}

          <div className="product-features">
            <div>
              <span>✦</span>
              Diseño exclusivo
            </div>

            <div>
              <span>✓</span>
              Calidad premium
            </div>

            <div>
              <span>3D</span>
              Acabado especial
            </div>

            <div>
              <span>∞</span>
              Para tus partidas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
