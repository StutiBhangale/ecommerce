import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/products"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <h2 className="mb-3">SignIn</h2>
        {error && <div className="alert danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2">
            <button className="btn primary" type="submit">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
