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
        <div>
          ✦
        </div>

        <h3>
          Todavía no tienes
          productos
        </h3>

        <p>
          Crea tu primer producto
          para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>
              Producto
            </th>

            <th>
              Categoría
            </th>

            <th>
              Precio
            </th>

            <th>
              Stock
            </th>

            <th>
              Estado
            </th>

            <th>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map(
            (product) => (
              <tr
                key={
                  product.id
                }
              >
                <td>
                  <div className="admin-product-cell">
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      onError={(
                        event
                      ) => {
                        event.currentTarget.src =
                          "https://loremflickr.com/200/200/dice?lock=999";
                      }}
                    />

                    <div>
                      <strong>
                        {
                          product.name
                        }
                      </strong>

                      <span>
                        {
                          product.badge
                        }
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  {
                    product.category
                  }
                </td>

                <td>
                  $
                  {Number(
                    product.price
                  ).toLocaleString(
                    "es-MX"
                  )}
                </td>

                <td>
                  <span
                    className={
                      Number(
                        product.stock
                      ) <= 3
                        ? "stock-low"
                        : ""
                    }
                  >
                    {
                      product.stock
                    }
                  </span>
                </td>

                <td>
                  <button
                    className={`status-pill ${
                      product.active !==
                      false
                        ? "active"
                        : "inactive"
                    }`}
                    onClick={() =>
                      onToggle(
                        product.id
                      )
                    }
                  >
                    {product.active !==
                    false
                      ? "Activo"
                      : "Oculto"}
                  </button>
                </td>

                <td>
                  <div className="admin-actions">
                    <button
                      title="Destacado"
                      className={
                        product.featured
                          ? "star-action active"
                          : "star-action"
                      }
                      onClick={() =>
                        onToggleFeatured(
                          product.id
                        )
                      }
                    >
                      ★
                    </button>

                    <button
                      className="edit-action"
                      onClick={() =>
                        onEdit(
                          product
                        )
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="delete-action"
                      onClick={() =>
                        onDelete(
                          product.id
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductTable;
