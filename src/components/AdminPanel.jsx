function AdminPanel({
  products,
  onNew,
  onEdit,
  onDelete,
  onToggle,
  onToggleFeatured,
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
      <div className="admin-panel-header">
        <div>
          <span className="admin-eyebrow">
            ✦ ADMINISTRACIÓN
          </span>

          <h1>
            Tu catálogo
            <span>♥</span>
          </h1>

          <p>
            Administra tus dados, marcos y productos.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={onNew}
        >
          <span>＋</span>
          Nuevo producto
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card pink">
          <div className="stat-icon">✦</div>

          <span>PRODUCTOS</span>

          <strong>{totalProducts}</strong>

          <small>En catálogo</small>
        </div>

        <div className="admin-stat-card purple">
          <div className="stat-icon">◈</div>

          <span>INVENTARIO</span>

          <strong>{totalStock}</strong>

          <small>Piezas disponibles</small>
        </div>

        <div className="admin-stat-card gold">
          <div className="stat-icon">★</div>

          <span>DESTACADOS</span>

          <strong>{featuredProducts}</strong>

          <small>Productos destacados</small>
        </div>
      </div>

      <div className="admin-table-section">
        <div className="admin-section-heading">
          <div>
            <span>CATÁLOGO</span>
            <h2>Productos</h2>
          </div>

          <div className="admin-product-count">
            {totalProducts} productos
          </div>
        </div>

        <AdminProductTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          onToggleFeatured={onToggleFeatured}
        />
      </div>
    </section>
  );
}

export default AdminPanel;
