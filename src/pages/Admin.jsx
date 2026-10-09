import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import AdminProductForm from "../components/AdminProductForm";
import AdminProductTable from "../components/AdminProductTable";

function Admin({
  products,
  onSaveProduct,
  onDeleteProduct,
  onToggleProduct,
  onToggleFeatured,
}) {
  const [
    editingProduct,
    setEditingProduct,
  ] = useState(null);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const statistics =
    useMemo(() => {
      return {
        total: products.length,

        active:
          products.filter(
            (product) =>
              product.active !==
              false
          ).length,

        featured:
          products.filter(
            (product) =>
              product.featured
          ).length,

        stock:
          products.reduce(
            (
              total,
              product
            ) =>
              total +
              Number(
                product.stock
              ),
            0
          ),
      };
    }, [products]);

  const handleNew = () => {
    setEditingProduct(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEdit = (
    product
  ) => {
    setEditingProduct(product);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



const handleSave = async (product) => {
  const saved = await onSaveProduct(product);

  if (saved) {
    setShowForm(false);
    setEditingProduct(null);
  }
};

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div>
          <Link
            to="/"
            className="back-catalog"
          >
            ← Volver al catálogo
          </Link>

          <span className="admin-kicker">
            PANEL DE CONTROL
          </span>

          <h1>
            Administración
            <br />
            <em>
              de productos.
            </em>
          </h1>

          <p>
            Gestiona tu catálogo,
            imágenes, precios,
            existencias y productos
            destacados desde un solo
            lugar.
          </p>
        </div>

        <button
          className="button button-primary admin-new-button"
          onClick={handleNew}
        >
          ＋ Nuevo producto
        </button>
      </section>

      <section className="admin-stats">
        <div>
          <span>
            PRODUCTOS
          </span>

          <strong>
            {statistics.total}
          </strong>

          <small>
            registrados
          </small>
        </div>

        <div>
          <span>
            ACTIVOS
          </span>

          <strong>
            {statistics.active}
          </strong>

          <small>
            visibles
          </small>
        </div>

        <div>
          <span>
            DESTACADOS
          </span>

          <strong>
            {statistics.featured}
          </strong>

          <small>
            especiales
          </small>
        </div>

        <div>
          <span>
            INVENTARIO
          </span>

          <strong>
            {statistics.stock}
          </strong>

          <small>
            piezas
          </small>
        </div>
      </section>

      {showForm && (
        <section className="admin-form-section">
          <div className="admin-section-heading">
            <div>
              <span>
                {editingProduct
                  ? "EDITAR PRODUCTO"
                  : "NUEVO PRODUCTO"}
              </span>

              <h2>
                {editingProduct
                  ? "Actualizar información"
                  : "Agregar al catálogo"}
              </h2>
            </div>

            <button
              className="close-admin-form"
              onClick={() => {
                setShowForm(false);
                setEditingProduct(
                  null
                );
              }}
            >
              Cancelar
            </button>
          </div>

          <AdminProductForm
            product={
              editingProduct
            }
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(
                null
              );
            }}
          />
        </section>
      )}

      <section className="admin-products-section">
        <div className="admin-section-heading">
          <div>
            <span>
              CATÁLOGO
            </span>

            <h2>
              Tus productos
            </h2>
          </div>

          <button
            className="button button-primary"
            onClick={handleNew}
          >
            ＋ Agregar
          </button>
        </div>

        <AdminProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={
            onDeleteProduct
          }
          onToggle={
            onToggleProduct
          }
          onToggleFeatured={
            onToggleFeatured
          }
        />
      </section>
    </main>
  );
}

export default Admin;
