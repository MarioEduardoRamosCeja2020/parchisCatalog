function CartDrawer({ cart, onClose, onRemove, onChangeQuantity }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <span>Tu selección</span>
            <h2>Mi carrito</h2>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>
              Explora nuestros diseños y agrega tus favoritos.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://loremflickr.com/200/200/dice?lock=999";
                    }}
                  />

                  <div className="cart-item-info">
                    <span>{item.category}</span>
                    <h4>{item.name}</h4>

                    <strong>
                      ${item.price} MXN
                    </strong>

                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          onChangeQuantity(
                            item.id,
                            item.quantity - 1
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
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => onRemove(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Productos</span>
                <strong>{totalItems}</strong>
              </div>

              <div>
                <span>Total</span>
                <strong>${total} MXN</strong>
              </div>

              <button className="checkout-button">
                Continuar compra →
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;