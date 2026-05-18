import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

  // Handle Register
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        form
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration Failed"
      );
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
          Register
        </h1>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          Register
        </button>

        {/* Login Link */}
        <p
          style={{
            marginTop: "15px",
          }}
        >
          Already have an account?{" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;