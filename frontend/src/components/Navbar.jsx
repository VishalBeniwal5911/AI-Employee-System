import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="glass navbar">

      {/* Logo */}
      <h2 className="nav-logo">
        AI Employee System
      </h2>

      {/* Nav Links */}
      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/employees">
          Employees
        </Link>

        <Link to="/add-employee">
          Add Employee
        </Link>

        <Link to="/ai-recommendations">
          AI Insights
        </Link>

      </div>

      {/* Logout Button */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;