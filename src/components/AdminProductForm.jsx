import {
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const emptyProduct = {
  name: "",
  category: "Dados",
  price: "",
  stock: "",
  badge: "NUEVO",
  color: "#ff167d",
  description: "",
  image: "",
  active: true,
  featured: false,
};

function AdminProductForm({
  product,
  onSave,
  onCancel,
}) {
  const [form, setForm] =
    useState(emptyProduct);

  const [errors, setErrors] =
    useState({});

  const [preview, setPreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const fileInputRef =
    useRef(null);

  useEffect(() => {
    if (product) {
      setForm({
        ...emptyProduct,
        ...product,
      });

      setPreview(product.image || "");
    } else {
      setForm({ ...emptyProduct });
      setPreview("");
    }

    setErrors({});
  }, [product]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((current) => ({
        ...current,
        image:
          "Selecciona un archivo de imagen válido.",
      }));

      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((current) => ({
        ...current,
        image:
          "La imagen debe pesar menos de 5 MB.",
      }));

      return;
    }

    setUploading(true);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      setPreview(result);

      setForm((current) => ({
        ...current,
        image: result,
      }));

      setErrors((current) => ({
        ...current,
        image: "",
      }));

      setUploading(false);
    };

    reader.onerror = () => {
      setErrors((current) => ({
        ...current,
        image: "No se pudo leer la imagen.",
      }));

      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file =
      event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Escribe el nombre del producto.";
    } else if (form.name.trim().length < 3) {
      nextErrors.name =
        "El nombre debe tener al menos 3 caracteres.";
    }

    const price = Number(form.price);

    if (
      !form.price ||
      Number.isNaN(price) ||
      price <= 0
    ) {
      nextErrors.price =
        "Ingresa un precio válido mayor a 0.";
    }

    const stock = Number(form.stock);

    if (
      form.stock === "" ||
      Number.isNaN(stock) ||
      stock < 0 ||
      !Number.isInteger(stock)
    ) {
      nextErrors.stock =
        "El inventario debe ser un número entero igual o mayor a 0.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Agrega una descripción.";
    }

    if (!form.image) {
      nextErrors.image =
        "Selecciona una imagen del producto.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const productToSave = {
      ...form,
      id: product?.id ?? Date.now(),
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      active: Boolean(form.active),
      featured: Boolean(form.featured),
    };

    onSave(productToSave);
  };

  return (
    <form
      className="admin-form"
      onSubmit={handleSubmit}
    >
      <div className="form-title">
        <span>✦ PRODUCTO</span>

        <h2>
          {product
            ? "Editar producto"
            : "Nuevo producto"}
        </h2>

        <p>
          Completa la información de tu producto.
        </p>
      </div>

      <div className="admin-form-grid">
        <div className="admin-form-main">
          <div className="form-field">
            <label>Nombre *</label>

            <input
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value
                )
              }
              placeholder="Ej. Dados Aurora"
            />

            {errors.name && (
              <small className="form-error">
                {errors.name}
              </small>
            )}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Categoría *</label>

              <select
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value
                  )
                }
              >
                <option>Dados</option>
                <option>Marcos</option>
                <option>Fichas</option>
              </select>
            </div>

            <div className="form-field">
              <label>Etiqueta</label>

              <select
                value={form.badge}
                onChange={(event) =>
                  updateField(
                    "badge",
                    event.target.value
                  )
                }
              >
                <option>NUEVO</option>
                <option>DESTACADO</option>
                <option>POPULAR</option>
                <option>ESPECIAL</option>
                <option>PREMIUM</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Precio *</label>

              <div className="input-with-prefix">
                <span>$</span>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.price}
                  onChange={(event) =>
                    updateField(
                      "price",
                      event.target.value
                    )
                  }
                  placeholder="95"
                />
              </div>

              {errors.price && (
                <small className="form-error">
                  {errors.price}
                </small>
              )}
            </div>

            <div className="form-field">
              <label>Stock *</label>

              <input
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(event) =>
                  updateField(
                    "stock",
                    event.target.value
                  )
                }
                placeholder="20"
              />

              {errors.stock && (
                <small className="form-error">
                  {errors.stock}
                </small>
              )}
            </div>
          </div>

          <div className="form-field">
            <label>Descripción *</label>

            <textarea
              rows="5"
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe el producto..."
            />

            {errors.description && (
              <small className="form-error">
                {errors.description}
              </small>
            )}
          </div>

          <div className="form-field">
            <label>Color del producto</label>

            <div className="color-picker-row">
              <input
                type="color"
                value={form.color}
                onChange={(event) =>
                  updateField(
                    "color",
                    event.target.value
                  )
                }
              />

              <span>{form.color}</span>
            </div>
          </div>

          <div className="form-switches">
            <label>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  updateField(
                    "active",
                    event.target.checked
                  )
                }
              />

              <span>
                Producto visible
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  updateField(
                    "featured",
                    event.target.checked
                  )
                }
              />

              <span>
                Producto destacado
              </span>
            </label>
          </div>
        </div>

        <div className="admin-form-image">
          <label>Imagen del producto *</label>

          <div
            className={`image-upload ${
              errors.image ? "has-error" : ""
            }`}
            onDragOver={(event) =>
              event.preventDefault()
            }
            onDrop={handleDrop}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Vista previa"
                />

                <div className="change-image-label">
                  ✦ Cambiar imagen
                </div>
              </>
            ) : (
              <div className="upload-placeholder">
                <span>✦</span>

                <strong>
                  Sube una imagen
                </strong>

                <small>
                  Toca aquí o arrastra una imagen
                </small>

                <small>
                  PNG, JPG, WEBP · máximo 5 MB
                </small>
              </div>
            )}

            {uploading && (
              <div className="upload-loading">
                Procesando...
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            onChange={handleFileChange}
          />

          {errors.image && (
            <small className="form-error">
              {errors.image}
            </small>
          )}

          <p className="upload-help">
            Desde PC puedes seleccionar el archivo
            normalmente. En celular podrás elegir una
            foto desde la galería o tomar una fotografía.
          </p>
        </div>
      </div>

      <div className="admin-form-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="button button-primary"
          disabled={uploading}
        >
          {product
            ? "Guardar cambios"
            : "Crear producto"}
        </button>
      </div>
    </form>
  );
}

export default AdminProductForm;
