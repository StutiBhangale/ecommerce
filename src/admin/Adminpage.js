import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Adminpage.css";
import EditDialog from "./EditDialog";
import instance from "../instance";

function Adminpage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      await instance.get("/products.json").then((response) => {
        console.log(response);
        const fetchedData = [];

        for (let key in response.data) {
          fetchedData.push({ ...response.data[key], id: key });
        }
        setProducts(fetchedData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setSelectedProduct(productToEdit);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (editedProduct) => {
    try {
      instance
        .put(`/products/${editedProduct.id}.json`, editedProduct)
        .then((response) => {
          console.log(response);
          instance.get("/products.json").then((response) => {
            console.log(response);
            const fetchedData = [];

            for (let key in response.data) {
              fetchedData.push({ ...response.data[key], id: key });
            }
            setProducts(fetchedData);
          });
        });

      setIsEditDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log("ID", id);
    try {
      instance.delete(`/products/${id}.json`).then((response) => {
        console.log(response);
        setProducts(products.filter((product) => product.id !== id));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ProductsCard = ({ id, image, title, price }) => {
    return (
      <div className="product-card">
        <img src={image} alt="item-img" />
        <h4 className="title">{title}</h4>
        <h3 className="price">${price}</h3>

        <div className="product-buttons">
          <button className="edit-button" onClick={() => handleEditProduct(id)}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteProduct(id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isEditDialogOpen && (
        <EditDialog
          product={selectedProduct}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveEdit}
        />
      )}

      <button className="btn2" onClick={() => navigate("/addproduct")}>
        Add Product
      </button>
      <div className="product-container">
        {products.map((product) => (
          <ProductsCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Adminpage;
//https://fakestoreapi.com/products