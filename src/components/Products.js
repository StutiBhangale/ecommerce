import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import "./Products.css";
import instance from "../instance";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

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
      //
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const ProductsCard = ({ image, title, price, id }) => {
    const [isAdded, setIsAdded] = useState(false);

    return (
      <div className="product-card">
        <img src={image} alt="item-img" />
        <h4 className="title">{title}</h4>
        <h3 className="price">${price}</h3>
        <button
          type="button"
          className={`btn1 ${isAdded ? "added" : ""}`}
          onClick={() => {
            handleAddToCart({ id, image, title, price });
            setIsAdded(true);
            setTimeout(() => {
              setIsAdded(false);
            }, 1000);
          }}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>
    );
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-bar-button">Search</button>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <ProductsCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
