import { useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../api/api";

import { toast } from "react-toastify";

function AddEmployee() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  // Handle Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const employeeData = {
        ...form,

        skills:
          form.skills.split(","),

        performanceScore:
          Number(
            form.performanceScore
          ),

        experience:
          Number(form.experience),
      };

      await API.post(
        "/employees",
        employeeData
      );

      toast.success(
        "Employee Added Successfully"
      );

      // Reset Form
      setForm({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed To Add Employee"
      );
    }
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <div
          className="glass"
          style={{
            padding: "35px",
          }}
        >

          <h1 className="page-title">
            Add Employee
          </h1>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Employee Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* Department */}
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            {/* Skills */}
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              required
            />

            {/* Performance Score */}
            <input
              type="number"
              name="performanceScore"
              placeholder="Performance Score"
              value={
                form.performanceScore
              }
              onChange={handleChange}
              required
            />

            {/* Experience */}
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={form.experience}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button
              className="primary-btn"
            >
              Add Employee
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default AddEmployee;