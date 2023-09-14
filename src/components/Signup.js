import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="box">
        <h2 className="mb-4">Signup</h2>
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
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
