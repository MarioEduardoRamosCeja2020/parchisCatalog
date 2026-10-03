function AdminPanel({
  products,
  onNew,
  onEdit,
  onDelete,
}) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock || 0),
    0
  );

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  return (
    <section className="admin-panel">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>PRODUCTOS</span>
          <strong>{totalProducts}</strong>
          <small>En catálogo</small>
        </div>

        <div className="admin-stat-card">
          <span>INVENTARIO</span>
          <strong>{totalStock}</strong>
          <small>Piezas disponibles</small>
        </div>

        <div className="admin-stat-card">
          <span>DESTACADOS</span>
          <strong>{featuredProducts}</strong>
          <small>Productos destacados</small>
        </div>
      </div>

      <div className="admin-toolbar">
        <div>
          <span className="admin-eyebrow">
            ADMINISTRACIÓN
          </span>

          <h2>Productos</h2>

          <p>
            Administra los dados y marcos del
            catálogo.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={onNew}
        >
          ＋ Nuevo producto
        </button>
      </div>

      <div className="admin-table-section">
        <AdminTableWrapper
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </section>
  );
}

function AdminTableWrapper({
  products,
  onEdit,
  onDelete,
}) {
  // Importación local para mantener el componente
  // sencillo y evitar dependencias innecesarias.
  return (
    <div className="admin-table-container">
      {products.length === 0 ? (
        <div className="admin-empty">
          <div>✦</div>
          <h3>Tu catálogo está vacío</h3>
          <p>
            Comienza agregando tu primer producto.
          </p>
        </div>
      ) : (
        <div className="admin-simple-list">
          {products.map((product) => (
            <div
              className="admin-list-row"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.src =
                    "https://loremflickr.com/200/200/dice?lock=999";
                }}
              />

              <div className="admin-list-info">
                <strong>{product.name}</strong>

                <span>
                  {product.category} · $
                  {product.price} MXN ·{" "}
                  {product.stock} disponibles
                </span>
              </div>

              <div className="admin-list-actions">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="delete"
                  onClick={() =>
                    onDelete(product.id)
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
