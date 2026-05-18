import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart({
  employees,
}) {

  return (

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

          {/* Employee Names */}
          <XAxis dataKey="name" />

          {/* Performance Score */}
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* Bars */}
          <Bar
            dataKey="performanceScore"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PerformanceChart;