function AdminProductTable({
  products,
  onEdit,
  onDelete,
  onToggle,
  onToggleFeatured,
}) {
  if (products.length === 0) {
    return (
      <div className="admin-empty">
        <div className="admin-empty-icon">
          ✦
        </div>

        <h3>Todavía no tienes productos</h3>

        <p>
          Crea tu primer producto para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const stock = Number(product.stock) || 0;

            return (
              <tr key={product.id}>
                <td>
                  <div className="admin-product-cell">
                    <div className="admin-product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://loremflickr.com/200/200/dice?lock=999";
                        }}
                      />
                    </div>

                    <div>
                      <strong>{product.name}</strong>

                      <span>
                        {product.badge || "PRODUCTO"}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="category-pill">
                    {product.category}
                  </span>
                </td>

                <td>
                  <strong className="admin-price">
                    $
                    {Number(
                      product.price
                    ).toLocaleString("es-MX")}
                  </strong>
                </td>

                <td>
                  <span
                    className={
                      stock <= 3
                        ? "stock-low"
                        : "stock-good"
                    }
                  >
                    {stock}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    className={`status-pill ${
                      product.active !== false
                        ? "active"
                        : "inactive"
                    }`}
                    onClick={() =>
                      onToggle(product.id)
                    }
                  >
                    <span>●</span>

                    {product.active !== false
                      ? "Activo"
                      : "Oculto"}
                  </button>
                </td>

                <td>
                  <div className="admin-actions">
                    <button
                      type="button"
                      title="Destacado"
                      className={
                        product.featured
                          ? "star-action active"
                          : "star-action"
                      }
                      onClick={() =>
                        onToggleFeatured(product.id)
                      }
                    >
                      ★
                    </button>

                    <button
                      type="button"
                      className="edit-action"
                      onClick={() =>
                        onEdit(product)
                      }
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="delete-action"
                      onClick={() =>
                        onDelete(product.id)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductTable;
