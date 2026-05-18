import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      // Save Token
      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error("Login Failed");
    }
  };

  return (
    <div className="auth-page">

      <form
        className="glass auth-form"
        onSubmit={handleSubmit}
      >

        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Button */}
        <button
          className="primary-btn"
        >
          Login
        </button>

        {/* Register Link */}
        <p
          style={{
            marginTop: "15px",
          }}
        >
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;