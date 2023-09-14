import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import instance from "../instance";

const AddProduct = ({ onProductAdded }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddProduct = async () => {
    if (title.trim() === "" || price === "" || image.trim() === "") {
      setErrorMsg("All fields are required.");
      return;
    }
  
    setErrorMsg("");

    const Data = {
      title: title,
      price: price,
      image: image,
    };

    try {
      await instance.post("/products.json", Data).then((response) => {
        console.log(response);

        const newProduct = { ...Data, id: response.data.name };

        if (onProductAdded) {
          onProductAdded(newProduct);
        }
        setImage("");
        setPrice("");
        setTitle("");

        navigate("/adminpage", { state: { newProduct: newProduct } });
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <div className="form">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form">
        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <div>
        <button className="form-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
