import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "../api/api";

import { toast } from "react-toastify";

function AIRecommendations() {

  const [employees, setEmployees] =
    useState([]);

  const [selectedEmployee,
    setSelectedEmployee] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Generate AI Recommendation
  const handleAI = async () => {

    try {

      setLoading(true);

      const employee =
        employees.find(
          (emp) =>
            emp._id ===
            selectedEmployee
        );

      const res = await API.post(
        "/ai/recommend",
        {
          employee,
        }
      );

      setResult(
        res.data.recommendation
      );

      toast.success(
        "AI Recommendation Generated"
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("AI Error");

      setLoading(false);
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
            AI Recommendation System
          </h1>

          {/* Employee Dropdown */}
          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(
                e.target.value
              )
            }
          >

            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (
              <option
                key={emp._id}
                value={emp._id}
              >
                {emp.name} -{" "}
                {emp.department}
              </option>
            ))}

          </select>

          {/* Selected Employee Details */}
          {selectedEmployee && (

            <div
              className="glass"
              style={{
                padding: "20px",
                marginTop: "20px",
              }}
            >

              {employees
                .filter(
                  (emp) =>
                    emp._id ===
                    selectedEmployee
                )
                .map((emp) => (

                  <div key={emp._id}>

                    <h2
                      style={{
                        marginBottom:
                          "15px",
                      }}
                    >
                      {emp.name}
                    </h2>

                    <p>
                      <strong>
                        Department:
                      </strong>{" "}
                      {emp.department}
                    </p>

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
                      {emp.skills.join(
                        ", "
                      )}
                    </p>

                  </div>
                ))}

            </div>
          )}

          {/* Generate Button */}
          <button
            className="primary-btn"
            onClick={handleAI}
            disabled={!selectedEmployee}
          >

            {loading
              ? "Generating..."
              : "Generate AI Recommendation"}

          </button>

          {/* AI Output */}
          {result && (

            <div
              className="glass"
              style={{
                padding: "25px",
                marginTop: "25px",
                lineHeight: "1.8",
                whiteSpace:
                  "pre-wrap",
              }}
            >

              <h2
                style={{
                  marginBottom:
                    "15px",
                }}
              >
                AI Insights
              </h2>

              <p>{result}</p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AIRecommendations;