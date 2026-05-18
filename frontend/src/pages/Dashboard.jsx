import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import API from "../api/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const [employees, setEmployees] =
    useState([]);

  // Fetch Employees
  const fetchEmployees = async () => {

    try {

      const res = await API.get(
        "/employees"
      );

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Dynamic Stats
  const totalEmployees =
    employees.length;

  const topPerformers =
    employees.filter(
      (emp) =>
        emp.performanceScore >= 85
    ).length;

  const departments = [
    ...new Set(
      employees.map(
        (emp) => emp.department
      )
    ),
  ];

  return (
    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <h1 className="page-title">
          HR Analytics Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="card-grid">

          <div className="glass card">
            <h2>Total Employees</h2>

            <h1>
              {totalEmployees}
            </h1>
          </div>

          <div className="glass card">
            <h2>Top Performers</h2>

            <h1>
              {topPerformers}
            </h1>
          </div>

          <div className="glass card">
            <h2>Departments</h2>

            <h1>
              {departments.length}
            </h1>
          </div>

        </div>

        {/* Performance Chart */}
        <div
          className="glass"
          style={{
            padding: "25px",
            marginTop: "30px",
            height: "400px",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Employee Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height="90%"
          >

            <BarChart data={employees}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="performanceScore"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;