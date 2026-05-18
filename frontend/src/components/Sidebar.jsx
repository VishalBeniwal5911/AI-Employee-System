import {
  FaHome,
  FaUsers,
  FaPlus,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="sidebar">

      {/* Logo */}
      <h2 className="logo">
        AI Employee
      </h2>

      {/* Sidebar Links */}
      <div className="sidebar-links">

        <Link to="/dashboard">
          <FaHome />
          Dashboard
        </Link>

        <Link to="/employees">
          <FaUsers />
          Employees
        </Link>

        <Link to="/add-employee">
          <FaPlus />
          Add Employee
        </Link>

        <Link to="/ai-recommendations">
          <FaRobot />
          AI Insights
        </Link>

      </div>

      {/* Logout Button */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;