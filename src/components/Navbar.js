import React from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/slices/cartSlice";
import { useUserAuth } from "../context/UserAuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserAuth();
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
  };

  const handleOpenCart = (open) => {
    dispatch(toggleCart(open));
  };

  const cartQuantity = cartItems.length;

  const shouldRenderLogoutButton = !["/", "/signup"].includes(
    location.pathname
  );
  const shouldRenderCartIcon = ![
    "/",
    "/signup",
    "/adminpage",
    "/addproduct",
  ].includes(location.pathname);

  const adminbtn =![
    "/",
    "/signup",
    "/adminpage",
    "/addproduct",
  ].includes(location.pathname)


  return (
    <>
      <nav className="nav">
        <a href="/" className="brand-name">
          React E-Commerce
        </a>

        {adminbtn && user && user.email === "admin@gmail.com" && (
          <div>
            <button
              className="admin-button"
              onClick={() => navigate("/adminpage")}
            >
              Admin
            </button>
          </div>
        )}

        {shouldRenderCartIcon && (
          <div
            title="Cart"
            className="cart_icon"
            onClick={() => handleOpenCart(true)}
          >
            <img src="icon.svg" alt="icon" />
            <span className="badge">{cartQuantity}</span>
          </div>
        )}
        {shouldRenderLogoutButton && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;

/*import React from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/slices/cartSlice";
import { useUserAuth } from "../context/UserAuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserAuth();
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
  };

  const handleOpenCart = (open) => {
    dispatch(toggleCart(open));
  };

  const cartQuantity = cartItems.length;

  const shouldRenderLogoutButton = !["/", "/signup"].includes(
    location.pathname
  );
  const shouldRenderCartIcon = ![
    "/",
    "/signup",
    "/adminpage",
    "/addproduct",
  ].includes(location.pathname);

  return (
    <>
      <nav className="nav">
        <a href="/" className="brand-name">
          React E-Commerce
        </a>

        {user && user.email === "admin@gmail.com" ? (
          
            <a href="/adminpage" className="link">Admin</a>
          
        ) : null}

        {shouldRenderCartIcon && (
          <div
            title="Cart"
            className="cart_icon"
            onClick={() => handleOpenCart(true)}
          >
            <img src="icon.svg" alt="icon" />
            <span className="badge">{cartQuantity}</span>
          </div>
        )}
        {shouldRenderLogoutButton && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;
*/