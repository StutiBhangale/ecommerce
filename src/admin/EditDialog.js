import React, { useState } from "react";
import "./EditDialog.css";

function EditDialog({ product, onClose, onSave }) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const errors = {};

    if (editedProduct.title.trim() === "") {
      errors.title = "Title is required.";
    }

    if (editedProduct.price === "") {
      errors.price = "Price is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
    } else {
      onSave(editedProduct);
    }
  };

  return (
    <div className="edit-dialog-container">
      <div className="edit-dialog">
        <h2>Edit Product</h2>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editedProduct.title}
          onChange={handleFieldChange}
        />
        {fieldErrors.title && <div className="error">{fieldErrors.title}</div>}

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={handleFieldChange}
        />
        {fieldErrors.price && <div className="error">{fieldErrors.price}</div>}

        <div className="edit-dialog-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditDialog;
