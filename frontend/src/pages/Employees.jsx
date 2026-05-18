import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "../api/api";

import { toast } from "react-toastify";

function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // Fetch Employees
  const fetchEmployees = async () => {

    try {

      const res = await API.get(
        "/employees"
      );

      setEmployees(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch employees"
      );
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {

    try {

      await API.delete(
        `/employees/${id}`
      );

      toast.success(
        "Employee Deleted"
      );

      fetchEmployees();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1 className="page-title">
          Employee List
        </h1>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            marginBottom: "25px",
          }}
        />

        {/* Employee Cards */}
        <div className="card-grid">

          {employees
            .filter((emp) =>
              emp.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((emp) => (

              <div
                className="glass employee-card"
                key={emp._id}
              >

                <h2
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {emp.name}
                </h2>

                <p>{emp.email}</p>

                <p>
                  <strong>
                    Department:
                  </strong>{" "}
                  {emp.department}
                </p>

                {/* Performance Color */}
                <p
                  style={{
                    color:
                      emp.performanceScore >=
                      85
                        ? "#22c55e"
                        : emp.performanceScore >=
                          60
                        ? "#facc15"
                        : "#ef4444",
                  }}
                >
                  <strong>
                    Performance:
                  </strong>{" "}
                  {
                    emp.performanceScore
                  }
                </p>

                <p>
                  <strong>
                    Experience:
                  </strong>{" "}
                  {emp.experience} Years
                </p>

                <p>
                  <strong>
                    Skills:
                  </strong>{" "}
                  {emp.skills.join(", ")}
                </p>

                {/* Delete Button */}
                <button
                  className="primary-btn"
                  onClick={() =>
                    deleteEmployee(
                      emp._id
                    )
                  }
                >
                  Delete Employee
                </button>

              </div>
            ))}

        </div>

      </div>
    </div>
  );
}

export default Employees;