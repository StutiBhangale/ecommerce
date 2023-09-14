import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store/store"; // Import store and persistor
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import AddProduct from "./admin/AddProduct";
import Adminpage from "./admin/Adminpage";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Cart />
        </div>
        <UserAuthContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/adminpage" element={<Adminpage />} />
            </Routes>
          </Router>
        </UserAuthContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
