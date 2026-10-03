function CartDrawer({
  cart,
  onClose,
  onRemove,
  onChangeQuantity,
}) {
  const totalItems =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );

  const total =
    cart.reduce(
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
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <aside className="cart-drawer">
        <header className="cart-header">
          <div>
            <span>
              TU COMPRA
            </span>

            <h2>
              Carrito
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>
              Tu carrito está vacío
            </h3>

            <p>
              Agrega algunos diseños
              para comenzar.
            </p>

            <button
              className="button button-primary"
              onClick={onClose}
            >
              Explorar colección
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
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <span>
                      {item.category}
                    </span>

                    <h4>
                      {item.name}
                    </h4>

                    <strong>
                      $
                      {Number(
                        item.price
                      ).toLocaleString(
                        "es-MX"
                      )}
                    </strong>

                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          onChangeQuantity(
                            item.id,
                            Number(
                              item.quantity
                            ) - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onChangeQuantity(
                            item.id,
                            Number(
                              item.quantity
                            ) + 1
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
                      onRemove(
                        item.id
                      )
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
                <span>
                  Productos
                </span>

                <span>
                  {totalItems}
                </span>
              </div>

              <div>
                <span>
                  Total
                </span>

                <strong>
                  $
                  {total.toLocaleString(
                    "es-MX"
                  )}{" "}
                  MXN
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
                CONTINUAR CON LA COMPRA
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
