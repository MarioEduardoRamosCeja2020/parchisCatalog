function CartDrawer({
  cart,
  onClose,
  onRemove,
  onChangeQuantity,
}) {
  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  return (
    <div
      className="cart-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <aside className="cart-drawer">
        <div className="cart-glow" />

        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">
              TU COMPRA
            </span>

            <h2>
              Tu carrito
              <span>♥</span>
            </h2>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-stars">
              ✦
            </div>

            <div className="empty-cart-icon">
              ♡
            </div>

            <h3>Tu carrito está vacío</h3>

            <p>
              Agrega algunos diseños increíbles
              para comenzar tu colección.
            </p>

            <button
              className="button button-primary"
              onClick={onClose}
            >
              Explorar colección
              <span>→</span>
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://loremflickr.com/300/300/dice?lock=999";
                      }}
                    />
                  </div>

                  <div className="cart-item-info">
                    <span>{item.category}</span>

                    <h4>{item.name}</h4>

                    <strong>
                      $
                      {Number(
                        item.price
                      ).toLocaleString("es-MX")}
                    </strong>

                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          onChangeQuantity(
                            item.id,
                            Number(item.quantity) - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          onChangeQuantity(
                            item.id,
                            Number(item.quantity) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      onRemove(item.id)
                    }
                    aria-label={`Eliminar ${item.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Productos</span>
                <span>{totalItems}</span>
              </div>

              <div className="cart-total-row">
                <span>Total</span>

                <strong>
                  $
                  {total.toLocaleString("es-MX")}
                  <small> MXN</small>
                </strong>
              </div>

              <button
                className="checkout-button"
                onClick={() =>
                  alert(
                    "Checkout próximamente."
                  )
                }
              >
                <span>CONTINUAR CON LA COMPRA</span>
                <b>→</b>
              </button>

              <p className="cart-secure">
                ✦ Compra segura · Calidad premium
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
